import React, { useEffect, useRef } from "react";

export default function YandexSearchForm() {
  const formRef = useRef(null);

  const dataBemConfig = {
    action: "http://4854069-fc63586.twc1.net/search",
    arrow: false,
    bg: "transparent",
    fontsize: 14,
    fg: "#000000",
    language: "ru",
    logo: "rb",
    publicname: "Поиск по 46.149.69.12",
    suggest: true,
    target: "_self",
    tld: "ru",
    type: 2,
    usebigdictionary: true,
    searchid: 12885827,
    input_fg: "#000000",
    input_bg: "#ffffff",
    input_fontStyle: "normal",
    input_fontWeight: "normal",
    input_placeholder: "Поиск по сайту...",
    input_placeholderColor: "#000000",
    input_borderColor: "#e5ccff",
  };

  useEffect(() => {
    const scriptId = "yandex-site-search-script";

    const initYandexForm = () => {
      if (window.Ya && window.Ya.Site && window.Ya.Site.Form && typeof window.Ya.Site.Form.init === "function") {
        window.Ya.Site.Form.init(); 
        console.log("Yandex Form init() called successfully.");
      } else {
        console.warn("Yandex objects not fully available yet. Retrying form init in 100ms...");
        setTimeout(initYandexForm, 100);
      }
    };

    document.documentElement.classList.add("ya-page_js_yes");

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.charset = "utf-8";
      script.src =
        (window.location.protocol === "https:" ? "https:" : "http:") +
        "//site.yandex.net/v2.0/js/all.js";

      script.onload = () => {
        console.log("Yandex script loaded successfully.");
        setTimeout(initYandexForm, 50);
      };
      script.onerror = (e) => {
        console.error("Failed to load Yandex script:", e);
      };

      document.body.appendChild(script);
    } else {
      console.log("Yandex script already present. Attempting to initialize form.");
      initYandexForm();
    }

    return () => {
      document.documentElement.classList.remove("ya-page_js_yes");
    };
  }, []);

  return (
  <div
      ref={formRef}
      className="ya-site-form ya-site-form_inited_no"
      data-bem={JSON.stringify(dataBemConfig)}
    >
      <form action="https://yandex.ru/search/site/" method="get" target="_self" acceptCharset="utf-8">
        <input type="hidden" name="searchid" value="12885827" />
        <input type="hidden" name="l10n" value="ru" />
        <input type="hidden" name="reqenc" value="" />
        <input type="search" name="text" value="" />
        <input type="submit" value="Найти" />
      </form>
    </div>
  );
}
