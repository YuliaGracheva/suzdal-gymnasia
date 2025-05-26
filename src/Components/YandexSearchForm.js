import React, { useEffect } from "react";

export default function YandexSearchForm() {
  useEffect(() => {
     window.yandex_site_callbacks = window.yandex_site_callbacks || [];

    window.yandex_site_callbacks.push(function () {
      if (window.Ya && window.Ya.Site && window.Ya.Site.Form) {
        window.Ya.Site.Form.init();
      }
    });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.charset = "utf-8";
    script.src = (document.location.protocol === "https:" ? "https:" : "http:") + "//site.yandex.net/v2.0/js/all.js";

    document.body.appendChild(script);

    document.documentElement.classList.add("ya-page_js_yes");

    return () => {
      document.body.removeChild(script);
      document.documentElement.classList.remove("ya-page_js_yes");
    };
  }, []);

  return (
    <>
      <div
        className="ya-site-form ya-site-form_inited_no"
        data-bem='{"action":"http://4854069-fc63586.twc1.net/search","arrow":false,"bg":"transparent","fontsize":14,"fg":"#000000","language":"ru","logo":"rb","publicname":"Поиск по 46.149.69.12","suggest":true,"target":"_self","tld":"ru","type":2,"usebigdictionary":true,"searchid":12885827,"input_fg":"#000000","input_bg":"#ffffff","input_fontStyle":"normal","input_fontWeight":"normal","input_placeholder":"Поиск по сайту...","input_placeholderColor":"#000000","input_borderColor":"#e5ccff"}'
      >
        <form
          action="https://yandex.ru/search/site/"
          method="get"
          target="_self"
          acceptCharset="utf-8"
        >
          <input type="hidden" name="searchid" value="12885827" />
          <input type="hidden" name="l10n" value="ru" />
          <input type="hidden" name="reqenc" value="" />
          <input type="search" name="text" defaultValue="" />
          <input type="submit" value="Найти" />
        </form>
      </div>

      <style>{`
        .ya-page_js_yes .ya-site-form_inited_no {
          display: none;
        }
      `}</style>
    </>
  );
}
