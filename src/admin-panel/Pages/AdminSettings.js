import React, { useState, useEffect } from "react";
import "./css/AdminSettings.css";

const AdminSettings = () => {
    const [siteTitle, setSiteTitle] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTitle = localStorage.getItem("siteTitle");
        const storedDescription = localStorage.getItem("siteDescription");
        const storedTheme = localStorage.getItem("theme");

        if (storedTitle) setSiteTitle(storedTitle);
        if (storedDescription) setSiteDescription(storedDescription);
        if (storedTheme) setTheme(storedTheme);

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

    const handleSave = () => {
        localStorage.setItem("siteTitle", siteTitle);
        localStorage.setItem("siteDescription", siteDescription);
        localStorage.setItem("theme", theme);

        applySettings(siteTitle, siteDescription, theme);

        alert("Настройки сохранены и применены!");
    };

    return (
        <div className="settings-container">
            <h2>Базовые настройки сайта</h2>

            <div className="settings-group">
                <label>Название сайта</label>
                <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                />
            </div>

            <div className="settings-group">
                <label>Описание сайта</label>
                <textarea
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                />
            </div>

            <button className="save-button" onClick={handleSave}>
                Сохранить изменения
            </button>
        </div>
    );
};

export default AdminSettings;
