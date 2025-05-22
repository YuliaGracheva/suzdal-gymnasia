import React, { useState, useEffect } from "react";
import "./css/AdminSettings.css";

const AdminSettings = () => {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [contacts, setContacts] = useState({ name: "", address: "", phones: "", email: "" });
    const [socialLinks, setSocialLinks] = useState({ vk: "", ok: "", telegram: "", youtube: "" });
    const [newsCount, setNewsCount] = useState(5);
    const [useRecaptcha, setUseRecaptcha] = useState(false);

    useEffect(() => {
        fetch("https://yuliagracheva.github.io/suzdal-gymnasia/api/settings")
            .then(res => res.json())
            .then((data) => {
                if (!data) return;
                setSiteTitle(data.siteTitle || "");
                setSiteDescription(data.siteDescription || "");
                setLogoPreview(data.logo || null);
                setContacts(JSON.parse(data.contacts || "{}"));
                setSocialLinks(JSON.parse(data.socialLinks || "{}"));
                setNewsCount(data.newsCount || 5);
                setUseRecaptcha(!!data.useRecaptcha);
                applySettings(data);
            });
    }, []);    

    const applySettings = (settings) => {
        document.title = settings.siteTitle || "";
        const desc = document.querySelector("meta[name='description']") || document.createElement("meta");
        desc.name = "description";
        desc.content = settings.siteDescription || "";
        document.head.appendChild(desc);
        if (settings.favicon) {
            const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
            link.rel = "icon";
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

    const handleSave = () => {
        const settings = {
            siteTitle,
            siteDescription,
            logo,
            contacts,
            socialLinks,
            newsCount,
            useRecaptcha
        };
    
        fetch("https://suzdal-gymnazia-v2.onrender.com/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings)
        })
        .then(res => res.json())
        .then((result) => {
            if (result.success) {
                applySettings(settings);
                alert("Настройки сохранены и применены!");
            } else {
                alert("Ошибка при сохранении настроек.");
            }
        });
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

                <label>Логотип</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} />
                {logoPreview && <img src={logoPreview} alt="Preview" className="logo-preview" />}
            </div>

            <div className="settings-group">
                <h3>Контакты</h3>
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
