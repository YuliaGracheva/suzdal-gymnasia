import React, { useEffect, useRef } from "react";

export default function YandexSearchForm() {
  const containerRef = useRef(null);

  useEffect(() => {
    const initYandex = () => {
      if (window.Ya?.Site?.Form?.init) {
        window.Ya.Site.Form.init();
      } else {
        setTimeout(initYandex, 300);
      }
    };

    // Подключаем скрипт, если его ещё нет
    if (!document.getElementById("yandex-site-search-script")) {
      const script = document.createElement("script");
      script.id = "yandex-site-search-script";
      script.type = "text/javascript";
      script.async = true;
      script.charset = "utf-8";
      script.src = (window.location.protocol === "https:" ? "https:" : "http:") +
        "//site.yandex.net/v2.0/js/all.js";
      script.onload = initYandex;
      document.body.appendChild(script);
    } else {
      initYandex();
    }

    document.documentElement.classList.add("ya-page_js_yes");

    return () => {
      document.documentElement.classList.remove("ya-page_js_yes");
    };
  }, []);

  const bemData = {
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
    input_borderColor: "#e5ccff"
  };

  return (
    <>
      <div
        ref={containerRef}
        className="ya-site-form ya-site-form_inited_no"
        data-bem={JSON.stringify(bemData)}
      ></div>

      <style>{`
        .ya-page_js_yes .ya-site-form_inited_no {
          display: none;
        }
      `}</style>
    </>
  );
}
