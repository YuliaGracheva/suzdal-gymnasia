import React, { useContext, useEffect } from 'react';
import { AccessibilityContext } from './context/AccessibilityContext.js';

export default function AccessibilityHandler() {
  const { accessible } = useContext(AccessibilityContext);

  useEffect(() => {
    document.body.classList.toggle("accessible-mode", accessible);
  }, [accessible]);

  return null; 
}
