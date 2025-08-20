'use client';

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "../../../contexts/TranslationContext";
import { toast } from "sonner";
import HotelSearchAPI from "../../../services/hotelSearchAPI";
import APIHotelCard from "../common/APIHotelCard";
import HotelProperties from "./HotelProperties";

const HotelSearchResults = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearchParams, setHasSearchParams] = useState(false);

  useEffect(() => {
    const location = searchParams.get('location');
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    const rooms = searchParams.get('rooms');
    const accType = searchParams.get('acc_type');

    // Check if we have search parameters from the main search
    const hasParams = location || checkIn || checkOut || adults || children || rooms || accType;
    setHasSearchParams(hasParams);

    if (hasParams) {
      searchHotels({
        location,
        check_in: checkIn,
        check_out: checkOut,
        adults: adults || '2',
        children: children || '0',
        rooms: rooms || '1',
        acc_type: accType || 'hotel'
      });
    }
  }, [searchParams]);

  const searchHotels = async (params) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Searching hotels with params:', params);
      const response = await HotelSearchAPI.searchHotels(params);
      console.log('API Response:', response);
      
      setHotels(response.results || []);
      setTotalCount(response.count || 0);
      
      if (response.results?.length === 0) {
        toast.info(t('hotel.noResults') || 'No hotels found for your search criteria.');
      } else {
        toast.success(`${response.count || 0} ${t('hotel.hotelsFound') || 'hotels found'}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message);
      toast.error(t('errors.searchFailed') || 'Failed to search hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Convert search params to object for passing to hotel cards
  const searchParamsObj = {
    location: searchParams.get('location'),
    check_in: searchParams.get('check_in'),
    check_out: searchParams.get('check_out'),
    adults: searchParams.get('adults'),
    children: searchParams.get('children'),
    rooms: searchParams.get('rooms'),
    acc_type: searchParams.get('acc_type')
  };

  // If no search parameters, show default hotel properties
  if (!hasSearchParams) {
    return <HotelProperties />;
  }

  if (loading) {
    return (
      <div className="col-12">
        <div className="d-flex justify-center items-center py-60">
          <div className="text-center">
            <div className="spinner-border text-blue-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-15 mt-20">{t('common.searching') || 'Searching hotels...'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12">
        <div className="bg-light-2 rounded-4 px-30 py-30 text-center">
          <div className="icon-alert-triangle text-60 text-red-1 mb-20" />
          <h4 className="text-20 fw-500 mb-10">{t('errors.searchError') || 'Search Error'}</h4>
          <p className="text-15 text-light-1">{error}</p>
          <button 
            className="button h-50 px-30 -blue-1 bg-blue-1 text-white mt-20"
            onClick={() => window.location.reload()}
          >
            {t('common.tryAgain') || 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="col-12">
        <div className="bg-light-2 rounded-4 px-30 py-30 text-center">
          <div className="icon-search text-60 text-light-1 mb-20" />
          <h4 className="text-20 fw-500 mb-10">{t('hotel.noResults') || 'No Hotels Found'}</h4>
          <p className="text-15 text-light-1">
            {t('hotel.noResultsMessage') || 'No hotels match your search criteria. Try adjusting your filters.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search results header */}
      <div className="col-12">
        <div className="d-flex justify-between items-center mb-20">
          <div className="text-18 fw-500">
            {totalCount} {totalCount === 1 ? t('hotel.hotelFound') : t('hotel.hotelsFound')} {t('hotel.forYourSearch')}
          </div>
          {searchParamsObj.location && (
            <div className="text-14 text-light-1">
              {t('hotel.searchingIn')} {searchParamsObj.location}
            </div>
          )}
        </div>
      </div>

      {/* Hotel results */}
      {hotels.map((hotel) => (
        <APIHotelCard 
          key={hotel.hotel_id} 
          hotel={hotel} 
          searchParams={searchParamsObj}
        />
      ))}
    </>
  );
};

export default HotelSearchResults;
