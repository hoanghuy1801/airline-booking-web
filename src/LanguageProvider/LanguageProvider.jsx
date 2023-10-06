import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslation from '../translations/en.json';
import viTranslation from '../translations/vi.json';
import { useSelector } from 'react-redux';
// Tạo context cho LanguageProvider
const LanguageContext = createContext();

// Component LanguageProvider
const LanguageProvider = ({ children }) => {
    const myLanguage = useSelector((state) => state.language.language);
    useEffect(() => {
        setLanguage(myLanguage);
    }, [myLanguage]);
    const [language, setLanguage] = useState('vi');

    // Phương thức để thay đổi ngôn ngữ
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    // Phương thức để lấy dữ liệu ngôn ngữ
    const getText = (key) => {
        let translations;
        if (language === 'vi') {
            translations = viTranslation;
        } else if (language === 'en') {
            translations = enTranslation;
        }
        return translations[key] || '';
    };

    // Trả về LanguageContext.Provider với giá trị và phương thức cần thiết
    return (
        <LanguageContext.Provider value={{ language, changeLanguage, getText }}>
            {children}
        </LanguageContext.Provider>
    );
};
const useLanguage = () => useContext(LanguageContext);

export { LanguageProvider, useLanguage };