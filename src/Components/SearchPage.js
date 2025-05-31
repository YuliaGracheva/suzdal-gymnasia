import React, { useEffect, useRef } from "react";

export default function YandexSearchResults() {
  const resultsRef = useRef(null);

  useEffect(() => {
    const initYandexResults = () => {
      if (window.Ya?.Site?.Results?.init) {
        window.Ya.Site.Results.init();
      } else {
        setTimeout(initYandexResults, 300); 
      }
    };

    if (!document.getElementById("yandex-site-results-script")) {
      const script = document.createElement("script");
      script.id = "yandex-site-results-script";
      script.type = "text/javascript";
      script.async = true;
      script.charset = "utf-8";
      script.src =
        (window.location.protocol === "https:" ? "https:" : "http:") +
        "//site.yandex.net/v2.0/js/all.js";
      script.onload = initYandexResults;
      document.body.appendChild(script);
    } else {
      initYandexResults();
    }
  }, []);

  const bemData = {
    tld: "ru",
    language: "ru",
    encoding: "",
    htmlcss: "1.x",
    updatehash: true,
  };

  return (
    <div
      id="ya-site-results"
      ref={resultsRef}
      data-bem={JSON.stringify(bemData)}
    ></div>
  );
}
