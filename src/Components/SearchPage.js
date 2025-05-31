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
    <div id="ya-site-results" data-bem="{&quot;tld&quot;: &quot;ru&quot;,&quot;language&quot;: &quot;ru&quot;,&quot;encoding&quot;: &quot;&quot;,&quot;htmlcss&quot;: &quot;1.x&quot;,&quot;updatehash&quot;: true}"></div><script type="text/javascript">(function(w,d,c){var s=d.createElement('script'),h=d.getElementsByTagName('script')[0];s.type='text/javascript';s.async=true;s.charset='utf-8';s.src=(d.location.protocol==='https:'?'https:':'http:')+'//site.yandex.net/v2.0/js/all.js';h.parentNode.insertBefore(s,h);(w[c]||(w[c]=[])).push(function(){Ya.Site.Results.init();})})(window,document,'yandex_site_callbacks');</script>

  `;

  return <div dangerouslySetInnerHTML={{ __html: searchHtml }} />;
}
