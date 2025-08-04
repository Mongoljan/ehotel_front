'use client';

import { useTranslation } from '../../contexts/TranslationContext';

export default function DebugTranslation() {
  const { 
    currentLanguage, 
    changeLanguage, 
    t, 
    availableLanguages, 
    getLanguageInfo,
    isLoading 
  } = useTranslation();

  const handleLanguageSwitch = (langCode) => {
    console.log('Switching to:', langCode);
    if (changeLanguage) {
      changeLanguage(langCode);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Translation Debug Page</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Context Values:</h3>
        <p><strong>Current Language:</strong> {currentLanguage}</p>
        <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>changeLanguage function:</strong> {typeof changeLanguage}</p>
        <p><strong>Available Languages Count:</strong> {availableLanguages?.length || 0}</p>
        <p><strong>getLanguageInfo function:</strong> {typeof getLanguageInfo}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Available Languages:</h3>
        {availableLanguages && availableLanguages.length > 0 ? (
          availableLanguages.map((lang) => (
            <div key={lang.code} style={{ margin: '10px 0' }}>
              <button 
                onClick={() => handleLanguageSwitch(lang.code)}
                style={{ 
                  padding: '10px 15px', 
                  margin: '5px',
                  backgroundColor: currentLanguage === lang.code ? '#007bff' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {lang.flag} {lang.name} {currentLanguage === lang.code ? '(Current)' : ''}
              </button>
            </div>
          ))
        ) : (
          <p>No languages available</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Translation Test:</h3>
        <p><strong>Home:</strong> {t('navigation.home')}</p>
        <p><strong>Hotels:</strong> {t('navigation.hotels')}</p>
        <p><strong>Search:</strong> {t('common.search')}</p>
      </div>
    </div>
  );
}
