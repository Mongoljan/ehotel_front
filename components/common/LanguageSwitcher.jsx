'use client';

import { useTranslation } from '../../contexts/TranslationContext';
import { useState, useRef, useEffect } from 'react';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages, getLanguageInfo } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const currentLangInfo = getLanguageInfo(currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-outline-light d-flex align-items-center gap-2 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          fontSize: '14px',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '16px' }}>{currentLangInfo?.flag}</span>
        <span className="d-none d-md-inline">{currentLangInfo?.name}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ fontSize: '10px' }}></i>
      </button>

      {isOpen && (
        <div 
          className="position-absolute top-100 end-0 bg-white shadow-lg rounded-3 mt-2 py-2"
          style={{
            minWidth: '150px',
            zIndex: 1050,
            border: '1px solid rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`btn btn-link text-decoration-none w-100 text-start px-3 py-2 d-flex align-items-center gap-2 ${
                currentLanguage === lang.code ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                border: 'none',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '16px' }}>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLanguage === lang.code && (
                <i className="fas fa-check ms-auto text-primary" style={{ fontSize: '12px' }}></i>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .btn:hover {
          background-color: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
