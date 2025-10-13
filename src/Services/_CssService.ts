/* eslint-disable no-prototype-builtins */

import * as CSS from 'css';
import { UTILS } from '~/Utils';

export default class CssService {
    static convertToJson(css: string): Reptile.Models.Stylesheet {

           const json = CSS.parse(css) as Reptile.Models.Stylesheet;
      

        json.stylesheet.rules.map((rule) => {
            if (rule.type.toUpperCase() !== 'RULE') {
                return rule;
            }

            const selector = rule.selectors[0];

            if (
                selector.split(' ').length > 1 ||
                selector.indexOf('.') > 0 ||
                selector.indexOf('#') > 0 ||
                selector.indexOf('>') > 0 ||
                selector.indexOf(',') > 0 ||
                selector.indexOf(':') > 0
            ) {
                return rule;
            }

            let selectorType = 'tag';
            if (selector.includes('.')) {
                selectorType = 'class';
            } else if (selector.includes('#')) {
                selectorType = 'id';
            }

            rule.visibility = rule.visibility ? rule.visibility : true;
            rule.name = rule.name ? rule.name : selector;
            rule.selectorName = selector;
            rule.selectorType = rule.selectorType
                ? rule.selectorType
                : selectorType;
            rule.styleType = selector.includes('image_') ? 'image' : 'text';

            return rule;
        });

        return json;
    }

    static convertToCss(json: Reptile.Models.Stylesheet) {
        return CSS.stringify(json);
    }

    static getInlineJsStyle(declarations: Reptile.Models.RuleDeclaration[], excludeImportant?: any) {
        const selectorCss: Record<string, unknown> = {};
        declarations
            ? declarations.forEach((declaration) => {
                  let property = '';
                  let propertyParts;
                  if (declaration.property) {
                      propertyParts = declaration.property.split('-');
                  }

                  propertyParts?.forEach((part, index) => {
                      if (index === 0) {
                          property += part;
                      } else {
                          property += UTILS.capitalizeFirstCharacter(part);
                      }
                  });

                  if (excludeImportant) {
                      return (selectorCss[property] = declaration.value.replace(
                          '!important',
                          ''
                      ));
                  }

                  return (selectorCss[property] = declaration.value);
              })
            : undefined;

        return selectorCss;
    }

    static getStyleCss(rule: Reptile.Models.Rule) {
        if (rule.type.toUpperCase() !== 'RULE') {
            return null;
        }

        const declarations = rule.declarations.filter(
            (x) => x.type.toUpperCase() === 'DECLARATION'
        );
        let css = `${rule.selectorName}{`;
        declarations.forEach((declaration) => {
            css += `${declaration.property} : ${declaration.value};`;
            return css;
        });

        css = css + '}';

        return css;
    }
}
