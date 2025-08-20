
'use client'

import { useTranslation } from '../../../contexts/TranslationContext';
import { useSelector, useDispatch } from "react-redux";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import { useState, useRef } from "react";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import LocationSearch from "./LocationSearch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MainFilterSearchBox = () => {
  const { t } = useTranslation();
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  
  // Refs to get data from child components
  const locationRef = useRef();
  const datesRef = useRef();
  const guestRef = useRef();

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      
      // Get search parameters from localStorage and child components
      const location = locationRef.current?.getSelectedLocation?.() || localStorage.getItem('selected_location') || '';
      const checkIn = localStorage.getItem('check_in') || '';
      const checkOut = localStorage.getItem('check_out') || '';
      const adults = guestRef.current?.getGuestCounts?.()?.Adults || 2;
      const children = guestRef.current?.getGuestCounts?.()?.Children || 0;
      const rooms = guestRef.current?.getGuestCounts?.()?.Rooms || 1;

      // Validate required fields
      if (!location.trim()) {
        toast.error(t('errors.locationRequired') || 'Please select a location');
        return;
      }
      
      if (!checkIn || !checkOut) {
        toast.error(t('errors.datesRequired') || 'Please select check-in and check-out dates');
        return;
      }

      // Build search URL with parameters
      const searchParams = new URLSearchParams({
        location: location.trim(),
        check_in: checkIn,
        check_out: checkOut,
        adults: adults.toString(),
        children: children.toString(),
        rooms: rooms.toString(),
        acc_type: 'hotel'
      });

      // Navigate to hotel list with search parameters
      router.push(`/hotel-list-v1?${searchParams.toString()}`);
      
    } catch (error) {
      console.error('Search error:', error);
      toast.error(t('errors.searchFailed') || 'Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="tabs__controls d-flex x-gap-30 y-gap-20 justify-center sm:justify-start js-tabs-controls">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`tabs__button text-15 fw-500 text-white pb-4 js-tabs-button ${
              tab?.name === currentTab ? "is-tab-el-active" : ""
            }`}
            onClick={() => dispatch(addCurrentTab(tab?.name))}
          >
            {tab?.name}
          </button>
        ))}
      </div>

      <div className="position-relative mt-30 md:mt-20 js-tabs-content">
        <div className="mainSearch -w-900 bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-100">
          <div className="button-grid items-center">
            <LocationSearch ref={locationRef} />
            {/* End Location */}

            <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div>
                <h4 className="text-15 fw-500 ls-2 lh-16">
                  {t('hero.checkInOut')}
                </h4>
                <DateSearch ref={datesRef} />
              </div>
            </div>
            {/* End check-in-out */}

            <GuestSearch ref={guestRef} />
            {/* End guest */}

            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 h-60 px-35 col-12 rounded-100 bg-blue-1 text-white"
                onClick={handleSearch}
                disabled={isSearching}
              >
                <i className={`${isSearching ? 'icon-loading-animated' : 'icon-search'} text-20 mr-10`} />
                {isSearching ? t('common.searching') || 'Searching...' : t('common.search')}
              </button>
            </div>
            {/* End search button_item */}
          </div>
        </div>
        {/* End .mainSearch */}
      </div>
      {/* End serarchbox tab-content */}
    </>
  );
};

export default MainFilterSearchBox;
