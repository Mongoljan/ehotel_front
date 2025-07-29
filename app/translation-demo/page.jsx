'use client';

import { useTranslation } from "../../contexts/TranslationContext";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";

export default function TranslationDemo() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Language Switcher */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">{t('hero.title')}</h1>
            <LanguageSwitcher />
          </div>

          {/* Hero Section Demo */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{t('navigation.home')}</h2>
              <p className="card-text">{t('hero.subtitle')}</p>
              <button className="btn btn-primary">{t('hero.searchButton')}</button>
            </div>
          </div>

          {/* Hotel Section Demo */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{t('hotel.title')}</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder={t('hotel.destination')} 
                  />
                </div>
                <div className="col-md-3">
                  <input 
                    type="date" 
                    className="form-control"
                    title={t('hotel.checkIn')}
                  />
                </div>
                <div className="col-md-3">
                  <input 
                    type="date" 
                    className="form-control"
                    title={t('hotel.checkOut')}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-success">{t('hotel.findHotels')}</button>
              </div>
              
              <div className="mt-3">
                <h5>{t('hotel.amenities')}</h5>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-success">{t('hotel.freeCancellation')}</span>
                  <span className="badge bg-info">{t('hotel.freeWifi')}</span>
                  <span className="badge bg-warning text-dark">{t('hotel.breakfastIncluded')}</span>
                  <span className="badge bg-primary">{t('hotel.pool')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Demo */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{t('navigation.home')}</h2>
              <div className="d-flex flex-wrap gap-2">
                <a href="#" className="btn btn-outline-primary btn-sm">{t('navigation.hotels')}</a>
                <a href="#" className="btn btn-outline-primary btn-sm">{t('navigation.flights')}</a>
                <a href="#" className="btn btn-outline-primary btn-sm">{t('navigation.tours')}</a>
                <a href="#" className="btn btn-outline-primary btn-sm">{t('navigation.cars')}</a>
                <a href="#" className="btn btn-outline-primary btn-sm">{t('navigation.activities')}</a>
              </div>
            </div>
          </div>

          {/* Common Actions Demo */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{t('common.loading')}</h2>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary">{t('common.save')}</button>
                <button className="btn btn-secondary">{t('common.cancel')}</button>
                <button className="btn btn-success">{t('common.confirm')}</button>
                <button className="btn btn-warning">{t('common.edit')}</button>
                <button className="btn btn-danger">{t('common.delete')}</button>
              </div>
            </div>
          </div>

          {/* Current Language Info */}
          <div className="alert alert-info">
            <strong>Current Language:</strong> {currentLanguage === 'en' ? 'English' : 'Mongolian'}
            <br />
            <strong>Language Code:</strong> {currentLanguage}
          </div>
        </div>
      </div>
    </div>
  );
}
