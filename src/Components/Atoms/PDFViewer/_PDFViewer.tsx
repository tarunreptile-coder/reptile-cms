import React, { useEffect, useRef } from "react";

const loadPDFScript = () => {
  if (!(window as any).pdfjsLib) {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.body.appendChild(script);
  }
};

const PDFViewer: React.FC<{ url: string; customStyle: any }> = ({
  url,
  customStyle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPDFScript();

    const waitForPDFJS = setInterval(() => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib?.getDocument) {
        clearInterval(waitForPDFJS);
        renderPDF(url);
      }
    }, 200);
  }, [url]);

  const renderPDF = async (pdfUrl: string) => {
    const pdfjsLib = (window as any).pdfjsLib;
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const totalPages = pdf.numPages;

    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = ""; // Clear previous render if needed

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.marginBottom = "24px";
      canvas.style.border = "1px solid #ccc";

      const context = canvas.getContext("2d");
      if (context) {
        await page.render({ canvasContext: context, viewport }).promise;
        container.appendChild(canvas);
      }
    }
  };

  return <div ref={containerRef} style={customStyle} />;
};

export default PDFViewer;
