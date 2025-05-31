import React, { useEffect } from "react";

export default function YandexSearchResultsEmbed() {
  useEffect(() => {
    if (!document.getElementById("yandex-site-results-script")) {
      const script = document.createElement("script");
      script.id = "yandex-site-results-script";
      script.type = "text/javascript";
      script.async = true;
      script.charset = "utf-8";
      script.src =
        (window.location.protocol === "https:" ? "https:" : "http:") +
        "//site.yandex.net/v2.0/js/all.js";
      document.body.appendChild(script);
    }

    // запускаем инициализацию
    if (!window.yandex_site_callbacks) {
      window.yandex_site_callbacks = [];
    }

    window.yandex_site_callbacks.push(function () {
      if (window.Ya?.Site?.Results?.init) {
        window.Ya.Site.Results.init();
      }
    });
  }, []);

  const searchHtml = `
    <div id="ya-site-results"
         data-bem='{
           "tld": "ru",
           "language": "ru",
           "encoding": "",
           "htmlcss": "1.x",
           "updatehash": true
         }'>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: searchHtml }} />;
}
