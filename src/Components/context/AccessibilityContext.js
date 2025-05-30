import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
    const [accessible, setAccessible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('accessibleMode') === 'true';
        setAccessible(stored);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('accessible-mode', accessible);
        localStorage.setItem('accessibleMode', accessible);
    }, [accessible]);

    const toggleAccessibilityMode = () => {
        setAccessible(prev => !prev);
    };

    return (
        <AccessibilityContext.Provider value={{ accessible, toggleAccessibilityMode }}>
            {children}
        </AccessibilityContext.Provider>
    );
};
