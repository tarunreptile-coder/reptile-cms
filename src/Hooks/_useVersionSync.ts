import { useEffect } from "react";

const _useVersionCheck = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/build/version.json", { cache: "no-store" });
        const data = await res.json();
        const currentVersion = (window as any).APP_VERSION;
        const fetchedVersion = data.version;

        if (fetchedVersion !== currentVersion) {
          window.location.reload(); // Force reload from server
        }
      } catch (err) {
        // console.error("Version check failed:", err);
        return;
      }
    }, 30 * 1000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);
};

export default _useVersionCheck;
