import React, { useState, useEffect } from "react";
import "./css/AdminSettings.css";

const AdminSettings = () => {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [theme, setTheme] = useState("light");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [fontFamily, setFontFamily] = useState("Oswald");
    const [fontSize, setFontSize] = useState("16px");
    const [contacts, setContacts] = useState({ name: "", address: "", phones: "", email: "" });
    const [socialLinks, setSocialLinks] = useState({ vk: "", ok: "", telegram: "", youtube: "" });
    const [seo, setSeo] = useState({ keywords: "", description: "" });
    const [favicon, setFavicon] = useState(null);
    const [newsCount, setNewsCount] = useState(5);
    const [useRecaptcha, setUseRecaptcha] = useState(false);

    useEffect(() => {
        const settings = localStorage.getItem("adminSettings");
        if (settings) {
            const parsed = JSON.parse(settings);
            setSiteTitle(parsed.siteTitle || "");
            setSiteDescription(parsed.siteDescription || "");
            setTheme(parsed.theme || "light");
            setLogoPreview(parsed.logo || null);
            setFontFamily(parsed.fontFamily || "Oswald");
            setFontSize(parsed.fontSize || "16px");
            setContacts(parsed.contacts || {});
            setSocialLinks(parsed.socialLinks || {});
            setSeo(parsed.seo || {});
            setFavicon(parsed.favicon || null);
            setNewsCount(parsed.newsCount || 5);
            setUseRecaptcha(parsed.useRecaptcha || false);
            applySettings(parsed);
        }
    }, []);

    const applySettings = (settings) => {
        document.title = settings.siteTitle || "";
        const desc = document.querySelector("meta[name='description']") || document.createElement("meta");
        desc.name = "description";
        desc.content = settings.siteDescription || "";
        document.head.appendChild(desc);
        document.body.setAttribute("data-theme", settings.theme || "light");
        document.body.style.fontFamily = settings.fontFamily || "Oswald";
        document.body.style.fontSize = settings.fontSize || "16px";
        if (settings.favicon) {
            const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
            link.rel = "icon";
            link.href = settings.favicon;
            document.head.appendChild(link);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result);
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFavicon(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const settings = {
            siteTitle,
            siteDescription,
            theme,
            logo,
            fontFamily,
            fontSize,
            contacts,
            socialLinks,
            seo,
            favicon,
            newsCount,
            useRecaptcha
        };
        localStorage.setItem("adminSettings", JSON.stringify(settings));
        applySettings(settings);
        alert("Настройки сохранены и применены!");
    };

    const handleChange = (obj, setObj) => (e) => {
        const { name, value } = e.target;
        setObj(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="settings-container">
            <h2>Настройки сайта</h2>

            <div className="settings-group">
                <label>Название сайта</label>
                <input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} />

                <label>Описание сайта</label>
                <textarea value={siteDescription} onChange={e => setSiteDescription(e.target.value)} />

                <label>Шрифт</label>
                <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                    <option value="Oswald">Oswald</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                </select>

                <label>Размер шрифта</label>
                <input type="number" value={parseInt(fontSize)} onChange={e => setFontSize(`${e.target.value}px`)} />

                <label>Логотип</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} />
                {logoPreview && <img src={logoPreview} alt="Preview" className="logo-preview" />}

                <label>Favicon</label>
                <input type="file" accept="image/*" onChange={handleFaviconChange} />
            </div>

            <div className="settings-group">
                <h3>Контакты</h3>
                <input name="name" placeholder="Название" value={contacts.name} onChange={handleChange(contacts, setContacts)} />
                <input name="address" placeholder="Адрес" value={contacts.address} onChange={handleChange(contacts, setContacts)} />
                <input name="phones" placeholder="Телефоны" value={contacts.phones} onChange={handleChange(contacts, setContacts)} />
                <input name="email" placeholder="Email" value={contacts.email} onChange={handleChange(contacts, setContacts)} />
            </div>

            <div className="settings-group">
                <h3>Соцсети</h3>
                <input name="vk" placeholder="ВКонтакте" value={socialLinks.vk} onChange={handleChange(socialLinks, setSocialLinks)} />
                <input name="ok" placeholder="Одноклассники" value={socialLinks.ok} onChange={handleChange(socialLinks, setSocialLinks)} />
                <input name="telegram" placeholder="Telegram" value={socialLinks.telegram} onChange={handleChange(socialLinks, setSocialLinks)} />
                <input name="youtube" placeholder="YouTube" value={socialLinks.youtube} onChange={handleChange(socialLinks, setSocialLinks)} />
            </div>

            <div className="settings-group">
                <h3>SEO</h3>
                <input name="keywords" placeholder="Meta keywords" value={seo.keywords} onChange={handleChange(seo, setSeo)} />
                <textarea name="description" placeholder="Meta description" value={seo.description} onChange={handleChange(seo, setSeo)} />
            </div>

            <div className="settings-group">
                <h3>Новости и безопасность</h3>
                <label>Кол-во новостей на главной</label>
                <input type="number" value={newsCount} onChange={(e) => setNewsCount(Number(e.target.value))} />

                <label>
                    <input type="checkbox" checked={useRecaptcha} onChange={() => setUseRecaptcha(!useRecaptcha)} />
                    Включить reCAPTCHA
                </label>
            </div>

            <button className="save-button" onClick={handleSave}>Сохранить</button>
        </div>
    );
};

export default AdminSettings;
