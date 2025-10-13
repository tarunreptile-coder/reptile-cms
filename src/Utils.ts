/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */

import data from '~/../appSettings.json';

export const UTILS = {
    capitalizeFirstCharacter: function (s: string) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    },

    removeStyleFromHTMLString(htmlString: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const elements = doc.querySelectorAll('*');
        elements.forEach((element) => {
            element.removeAttribute('style');
        });

        const strongElements = doc.querySelectorAll('strong');
        strongElements.forEach((strongElement) => {
            const parentElement = strongElement.parentNode;
            parentElement &&
                parentElement.replaceChild(
                    doc.createTextNode(strongElement.textContent ?? ''),
                    strongElement
                );
        });

        const modifiedHTMLString = new XMLSerializer().serializeToString(doc);

        return modifiedHTMLString;
    },

    fixSlashes: function (text: string) {
        let newText = text;
        if (text) {
            newText = '/' + text.replace(/\\/g, '/');

            if (newText.includes('//')) {
                return newText.replace('//', '/');
            }

            return newText;
        }
        return newText;
    },
    loadImage: function (path: string) {
        if (!path) {
            return null;
        }
        if (path.includes('http:') || path.includes('https:')) {
            return path.charAt(0) === '/' ? path.slice(1) : path;
        }
 
        return encodeURI(`${data.prod.cmsHost}` + `${this.fixSlashes(path)}`);
    },
    deepCopy: function (obj: Record<string, unknown>): Record<string, unknown> {
        if (typeof obj !== 'object' || obj === null) {
            // If the input is not an object, return it as is
            return obj;
        }

        let copy;

        if (Array.isArray(obj)) {
            // If the input is an array, create a new array
            copy = [];
            for (let i = 0; i < obj.length; i++) {
                // Recursively copy each element in the array
                copy[i] = this.deepCopy(obj[i]);
            }
        } else {
            // If the input is an object, create a new object
            copy = {};
            for (let key in obj) {
                // Check if the property belongs to the object itself (not from the prototype chain)
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    // Recursively copy each property in the object
                    copy[key] = this.deepCopy(obj[key]);
                }
            }
        }

        return copy;
    },
    loadFontsCssInHead: function (fonts: any) {
        let css = UTILS.loadFontsCss(fonts);

        let style = UTILS.createStyleElement(css);
        UTILS.pushToHead(style);
    },
    loadFontsCss: function (fonts: any) {
        let css = "";
        fonts?.forEach((font: any) => {
            css += `/* ${font?.license || ''} */` + font.css;
        });
        return css;
    },
    pushToHead: function (node: any) {
        let childNode = document.getElementById(node.id);
        let head = document.getElementsByTagName('head')[0];
        if (childNode) {
            head.replaceChild(node, childNode);
        } else {
            head.appendChild(node);
        }
    },
    createStyleElement: function (css: any) {
        let style = document.createElement("style");
        style.id = 'RT_custom_fonts'
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        return style;
    },
    normalizeImageSrcInEditor: function (html: any) {
        if(!html) return html;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        doc.querySelectorAll('img').forEach(img => {
            let src = img.getAttribute('src');
            if (src) {
                let cleanPath = src;
                if(src.includes('\\')) {
                    const normalized = src.replace(/\\/g, '/');
                    cleanPath = normalized.replace(/datastore[\\/]+plzcmsdata/i, '');
                    // prepend domain
                    if(cleanPath) {
                        cleanPath = UTILS.loadImage(cleanPath);
                    }
                } else {
                    cleanPath = UTILS.loadImage(cleanPath);
                }
                img.setAttribute('src', cleanPath);
            }
        });
        return doc.body.innerHTML;
    },
};
