import React, { useState, useEffect } from "react";
import "./css/AdminSettings.css";

const AdminSettings = () => {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [theme, setTheme] = useState("light");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [socialLinks, setSocialLinks] = useState({
        vk: "",
        ok: "",
        telegram: "",
        youtube: ""
    });

    useEffect(() => {
        const storedTitle = localStorage.getItem("siteTitle");
        const storedDescription = localStorage.getItem("siteDescription");
        const storedTheme = localStorage.getItem("theme");
        const storedLogo = localStorage.getItem("logo");
        const storedLinks = localStorage.getItem("socialLinks");

        if (storedTitle) setSiteTitle(storedTitle);
        if (storedDescription) setSiteDescription(storedDescription);
        if (storedTheme) setTheme(storedTheme);
        if (storedLogo) setLogoPreview(storedLogo);
        if (storedLinks) setSocialLinks(JSON.parse(storedLinks));

        applySettings(storedTitle, storedDescription, storedTheme);
    }, []);

    const applySettings = (title, description, themeValue) => {
        if (title) document.title = title;
        if (description) {
            let descTag = document.querySelector("meta[name='description']");
            if (!descTag) {
                descTag = document.createElement("meta");
                descTag.name = "description";
                document.head.appendChild(descTag);
            }
            descTag.content = description;
        }

        document.body.setAttribute("data-theme", themeValue || "light");
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

    const validateUrl = (url) => {
        if (!url) return "";
        try {
            const fixed = url.startsWith("http") ? url : `https://${url}`;
            const parsed = new URL(fixed);
            return parsed.href;
        } catch {
            return "";
        }
    };

    const handleSave = () => {
        const validLinks = {
            vk: validateUrl(socialLinks.vk),
            ok: validateUrl(socialLinks.ok),
            telegram: validateUrl(socialLinks.telegram),
            youtube: validateUrl(socialLinks.youtube)
        };

        localStorage.setItem("siteTitle", siteTitle);
        localStorage.setItem("siteDescription", siteDescription);
        localStorage.setItem("theme", theme);
        localStorage.setItem("logo", logo);
        localStorage.setItem("socialLinks", JSON.stringify(validLinks));

        applySettings(siteTitle, siteDescription, theme);

        alert("Настройки сохранены и применены!");
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks({ ...socialLinks, [name]: value });
    };

    return (
        <div className="settings-container">
            <h2>Базовые настройки сайта</h2>

            <div className="settings-group">
                <label>Название сайта</label>
                <input type="text" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
            </div>

            <div className="settings-group">
                <label>Описание сайта</label>
                <textarea value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
            </div>

            <div className="settings-group">
                <label>Выбор логотипа</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} />
                {logoPreview && <img src={logoPreview} alt="Превью логотипа" className="logo-preview" />}
            </div>

            <div className="settings-group">
                <label>Ссылки на соцсети</label>
                <input name="vk" placeholder="ВКонтакте" value={socialLinks.vk} onChange={handleSocialChange} />
                <input name="ok" placeholder="Одноклассники" value={socialLinks.ok} onChange={handleSocialChange} />
                <input name="telegram" placeholder="Telegram" value={socialLinks.telegram} onChange={handleSocialChange} />
            </div>

            <button className="save-button" onClick={handleSave}>
                Сохранить изменения
            </button>
        </div>
    );
};

export default AdminSettings;
