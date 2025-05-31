import React, { useEffect, useRef } from "react";

export default function SearchPage() {
  const resultsRef = useRef(null); 

  const dataBemConfig = {
    tld: "ru",
    language: "ru",
    encoding: "",
    htmlcss: "1.x",
    updatehash: true,
  };

  useEffect(() => {
    const scriptId = "yandex-site-search-script";
    const callbackQueueName = "yandex_site_callbacks"; 

    window[callbackQueueName] = window[callbackQueueName] || [];

    const initYandexResults = () => {
      console.log("Attempting to initialize Yandex results...");
      if (
        window.Ya &&
        window.Ya.Site &&
        window.Ya.Site.Results &&
        typeof window.Ya.Site.Results.init === "function"
      ) {
        window.Ya.Site.Results.init(); 
        console.log("Yandex Results init() called successfully.");
      } else {
        console.warn(
          "Yandex Results objects not fully available yet. Retrying results init in 100ms..."
        );
        setTimeout(initYandexResults, 100);
      }
    };

    window[callbackQueueName].push(initYandexResults);

    if (!document.getElementById(scriptId)) {
      console.log("Yandex script not found, appending it for results.");
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.charset = "utf-8";
      script.src =
        (window.location.protocol === "https:" ? "https:" : "http:") +
        "//site.yandex.net/v2.0/js/all.js";

      script.onerror = (e) => {
        console.error("Failed to load Yandex script for results:", e);
      };

      document.body.appendChild(script);
    } else {
      console.log("Yandex script already present for results.");
    }

    return () => {
    };
  }, []); 

  return (
    <div
      ref={resultsRef}
      id="ya-site-results" 
      data-bem={JSON.stringify(dataBemConfig)}
    >
    </div>
  );
}
