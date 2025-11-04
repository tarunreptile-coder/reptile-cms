import { useState, useEffect } from "react";

const _useWindowSize = (): { width: number, height: number } => {
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

export default _useWindowSize;
