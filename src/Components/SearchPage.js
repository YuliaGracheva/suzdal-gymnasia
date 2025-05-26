import React, { useEffect } from "react";

const SearchPage = () => {
    useEffect(() => {
        window.yandex_site_callbacks = window.yandex_site_callbacks || [];

        window.yandex_site_callbacks.push(function () {
            if (window.Ya && window.Ya.Site && window.Ya.Site.Results) {
                window.Ya.Site.Results.init();
            }
        });

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.charset = 'utf-8';
        script.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//site.yandex.net/v2.0/js/all.js';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div
                id="ya-site-results"
                data-bem='{"tld": "ru", "language": "ru", "encoding": "", "htmlcss": "1.x", "updatehash": true}'
                style={{
                    color: '#333333',
                    background: '#FFFFFF',
                    fontFamily: 'Arial',
                }}
            ></div>
            <style> {`
#ya-site-results
{
    color: #333333;
    background: #FFFFFF;
}

#ya-site-results .b-pager__current,
#ya-site-results .b-serp-item__number
{
    color: #333333 !important;
}

#ya-site-results
{
    font-family: Arial !important;
}

#ya-site-results :visited,
#ya-site-results .b-pager :visited,
#ya-site-results .b-foot__link:visited,
#ya-site-results .b-copyright__link:visited
{
    color: #b266ff;
}

#ya-site-results a:link,
#ya-site-results a:active,
#ya-site-results .b-pseudo-link,
#ya-site-results .b-head-tabs__link,
#ya-site-results .b-head-tabs__link:link,
#ya-site-results .b-head-tabs__link:visited,
#ya-site-results .b-dropdown__list .b-pseudo-link,
#ya-site-results .b-dropdowna__switcher .b-pseudo-link,
.b-popupa .b-popupa__content .b-menu__item,
#ya-site-results .b-foot__link:link,
#ya-site-results .b-copyright__link:link,
#ya-site-results .b-serp-item__mime,
#ya-site-results .b-pager :link
{
    color: #000000;
}

#ya-site-results :link:hover,
#ya-site-results :visited:hover,
#ya-site-results .b-pseudo-link:hover
{
    color: #6600cc !important;
}

#ya-site-results .l-page,
#ya-site-results .b-bottom-wizard
{
    font-size: 14px;
}

#ya-site-results .b-pager
{
    font-size: 1.25em;
}

#ya-site-results .b-serp-item__text,
#ya-site-results .ad
{
    font-style: normal;
    font-weight: normal;
}

#ya-site-results .b-serp-item__title-link,
#ya-site-results .ad .ad-link
{
    font-style: normal;
    font-weight: bold;
}

#ya-site-results .ad .ad-link a
{
    font-weight: bold;
}

#ya-site-results .b-serp-item__title,
#ya-site-results .ad .ad-link
{
    font-size: 16px;
}

#ya-site-results .b-serp-item__title-link:link,
#ya-site-results .b-serp-item__title-link
{
    font-size: 1em;
}

#ya-site-results .b-serp-item__number
{
    font-size: 13px;
}

#ya-site-results .ad .ad-link a
{
    font-size: 0.88em;
}

#ya-site-results .b-serp-url,
#ya-site-results .b-direct .url,
#ya-site-results .b-direct .url a:link,
#ya-site-results .b-direct .url a:visited
{
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    color: #cc99ff;
}

#ya-site-results .b-serp-item__links-link
{
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    color: #000000 !important;
}

#ya-site-results .b-pager__inactive,
#ya-site-results .b-serp-item__from,
#ya-site-results .b-direct__head-link,
#ya-site-results .b-image__title,
#ya-site-results .b-video__title
{
    color: #000000 !important;
}

#ya-site-results .b-pager__current,
#ya-site-results .b-pager__select
{
    background: #ffffcc;
}

#ya-site-results .b-foot,
#ya-site-results .b-line
{
    border-top-color: #ffffcc;
}

#ya-site-results .b-dropdown__popup .b-dropdown__list,
.b-popupa .b-popupa__content
{
    background-color: #FFFFFF;
}

.b-popupa .b-popupa__tail
{
    border-color: #ffffcc transparent;
}

.b-popupa .b-popupa__tail-i
{
    border-color: #FFFFFF transparent;
}

.b-popupa_direction_left.b-popupa_theme_ffffff .b-popupa__tail-i,
.b-popupa_direction_right.b-popupa_theme_ffffff .b-popupa__tail-i
{
    border-color: transparent #FFFFFF;
}

#ya-site-results .b-dropdowna__popup .b-menu_preset_vmenu .b-menu__separator
{
    border-color: #ffffcc;
}

.b-specification-list,
.b-specification-list .b-pseudo-link,
.b-specification-item__content label,
.b-specification-item__content .b-link,
.b-specification-list .b-specification-list__reset .b-link
{
    color: #333333 !important;
    font-family: Arial;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
}

.b-specification-item__content .b-calendar__title
{
    font-family: Arial;
    color: #333333;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
}

.b-specification-item__content .b-calendar-month__day_now_yes
{
    color: #ffffcc;
}

.b-specification-item__content .b-calendar .b-pseudo-link
{
    color: #333333;
}

.b-specification-item__content
{
    font-family: Arial !important;
    font-size: 14px;
}

.b-specification-item__content :visited
{
    color: #b266ff;
}

.b-specification-item__content .b-pseudo-link:hover,
.b-specification-item__content :visited:hover
{
    color: #6600cc !important;
}

#ya-site-results .b-popupa .b-popupa__tail-i
{
    background: #FFFFFF;
    border-color: #ffffcc !important;
}
`}</style>
        </>
    );
};

export default SearchPage;
