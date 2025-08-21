
'use client'

import { useTranslation } from '../../../contexts/TranslationContext';
import React, { useState, forwardRef, useImperativeHandle } from "react";

const Counter = ({ name, defaultValue, onCounterChange }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(defaultValue);
  
  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };

  const getTranslatedName = (name) => {
    switch(name) {
      case 'Adults': return t('hero.adults');
      case 'Children': return t('hero.children');
      case 'Rooms': return t('hero.rooms');
      default: return name;
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{getTranslatedName(name)}</div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">{t('hero.agesNote')}</div>
          )}
        </div>
        {/* End .col-auto */}
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={decrementCount}
            >
              <i className="icon-minus text-12" />
            </button>
            {/* decrement button */}
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            {/* counter text  */}
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              onClick={incrementCount}
            >
              <i className="icon-plus text-12" />
            </button>
            {/* increment button */}
          </div>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

const GuestSearch = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const counters = [
    { name: "Adults", defaultValue: 2 },
    { name: "Children", defaultValue: 0 },
    { name: "Rooms", defaultValue: 1 },
  ];
  
  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 0,
    Rooms: 1,
  });

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getGuestCounts: () => guestCounts
  }));

  const handleCounterChange = (name, value) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">{t('hero.guest')}</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{guestCounts.Adults}</span> {t('hero.adultsCount')} -{" "}
          <span className="js-count-child">{guestCounts.Children}</span>{" "}
          {t('hero.childrenCount')} - <span className="js-count-room">{guestCounts.Rooms}</span>{" "}
          {t('hero.roomCount')}
        </div>
      </div>
      {/* End guest */}

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              defaultValue={counter.defaultValue}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

GuestSearch.displayName = 'GuestSearch';

export default GuestSearch;
