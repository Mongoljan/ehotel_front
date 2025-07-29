'use client';

import { useTranslation } from '../../contexts/TranslationContext';
import { useState, useRef, useEffect } from 'react';

const LanguageMegaMenu = ({ textClass = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Use translation context - our context has fallback handling built-in
  const { currentLanguage, switchLanguage, languages } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get available languages from the languages object
  const availableLanguages = Object.values(languages || {});
  const currentLangInfo = languages && languages[currentLanguage] ? languages[currentLanguage] : { flag: '🇺🇸', name: 'English' };

  const handleLanguageChange = (langCode) => {
    if (switchLanguage) {
      switchLanguage(langCode);
    }
    setIsOpen(false);
  };

  return (
    <div className="dropdown js-dropdown js-category-menu" ref={dropdownRef}>
      <div
        className={`d-flex items-center text-14 cursor-pointer ${textClass}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <span className="js-dropdown-title me-2">
          {currentLangInfo?.flag} {currentLangInfo?.name}
        </span>
        <i className={`icon icon-chevron-sm-down text-7 ${isOpen ? 'rotate-180' : ''}`}></i>
      </div>

      <div 
        className={`toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 ${
          isOpen ? 'd-block' : 'd-none'
        }`}
        style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          zIndex: 1000,
          minWidth: '200px',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginTop: '4px'
        }}
      >
        <div className="px-20 py-20 border-bottom-light">
          <div className="text-15 fw-500 lh-15">Choose Language</div>
        </div>

        <div className="py-15">
          {availableLanguages.map((lang) => (
            <div
              key={lang.code}
              className={`d-block js-dropdown-link px-20 py-10 cursor-pointer hover-bg-light ${
                currentLanguage === lang.code ? 'bg-light-2' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex items-center">
                <div className="me-10">
                  <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                </div>
                <div className="text-14 lh-12">
                  {lang.name}
                  {currentLanguage === lang.code && (
                    <i className="icon-check text-10 ms-10 text-green-1"></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageMegaMenu;
