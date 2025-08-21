
'use client'

import { useTranslation } from '../../../contexts/TranslationContext';
import { useState, forwardRef, useImperativeHandle } from "react";

const SearchBar = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getSelectedLocation: () => {
      return selectedItem?.name || searchValue;
    },
    getSelectedLocationData: () => {
      return selectedItem;
    }
  }));

  const locationSearchContent = [
    {
      id: 1,
      name: "Сүхбаатар",
      address: "Улаанбаатар, Монгол",
    },
    {
      id: 2,
      name: "Хан-Уул",
      address: "Улаанбаатар, Монгол",
    },
    {
      id: 3,
      name: "Баянзүрх",
      address: "Улаанбаатар, Монгол",
    },
    {
      id: 4,
      name: "Чингэлтэй",
      address: "Улаанбаатар, Монгол",
    },
    {
      id: 5,
      name: "Баянгол",
      address: "Улаанбаатар, Монгол",
    },
    {
      id: 6,
      name: "Сонгинохайрхан",
      address: "Улаанбаатар, Монгол",
    },
  ];

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    // Store in localStorage for persistence
    localStorage.setItem('selected_location', item.name);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    // If user types manually, store the value
    localStorage.setItem('selected_location', e.target.value);
  };

  // Filter locations based on search input
  const filteredLocations = locationSearchContent.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">{t('hero.location')}</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder={t('hero.whereGoing')}
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* End location Field */}

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {filteredLocations.map((item) => (
                <li
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  key={item.id}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500 js-search-option-target">
                        {item.name}
                      </div>
                      <div className="text-14 lh-12 text-light-1 mt-5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {filteredLocations.length === 0 && searchValue && (
                <li className="px-20 py-15 text-center text-light-1">
                  {t('hero.noLocationsFound') || 'No locations found'}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
