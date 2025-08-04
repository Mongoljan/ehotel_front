'use client';

import { useTranslation } from '../../../contexts/TranslationContext';
import { useState } from 'react';
import Link from 'next/link';

const RecommendedHotels = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: t('hotel.filters.all') || 'All' },
    { id: 'luxury', name: t('hotel.filters.luxury') || 'Luxury' },
    { id: 'budget', name: t('hotel.filters.budget') || 'Budget' },
    { id: 'boutique', name: t('hotel.filters.boutique') || 'Boutique' },
    { id: 'business', name: t('hotel.filters.business') || 'Business' }
  ];

  const recommendedHotels = [
    {
      id: 1,
      name: "The Ritz Carlton",
      image: "/img/hotels/5.jpg",
      rating: 4.9,
      price: 450,
      location: "New York, USA",
      reviews: 2547,
      category: 'luxury',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
    },
    {
      id: 2,
      name: "Boutique Hotel Central",
      image: "/img/hotels/6.jpg", 
      rating: 4.6,
      price: 185,
      location: "Paris, France",
      reviews: 1834,
      category: 'boutique',
      amenities: ['Free WiFi', 'Bar', 'Gym', 'Breakfast']
    },
    {
      id: 3,
      name: "Business Inn Express",
      image: "/img/hotels/7.jpg",
      rating: 4.4,
      price: 89,
      location: "London, UK", 
      reviews: 3156,
      category: 'business',
      amenities: ['Free WiFi', 'Business Center', 'Meeting Rooms']
    },
    {
      id: 4,
      name: "Budget Stay Hotel",
      image: "/img/hotels/8.jpg",
      rating: 4.2,
      price: 45,
      location: "Berlin, Germany",
      reviews: 891,
      category: 'budget',
      amenities: ['Free WiFi', 'Breakfast', '24/7 Reception']
    }
  ];

  const filteredHotels = activeFilter === 'all' 
    ? recommendedHotels 
    : recommendedHotels.filter(hotel => hotel.category === activeFilter);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-between items-center mb-30">
          <div className="sectionTitle -md">
            <h2 className="sectionTitle__title">{t('hotel.recommended') || 'Recommended Hotels'}</h2>
            <p className="sectionTitle__text mt-5 sm:mt-0">
              {t('hotel.recommendedDesc') || 'Handpicked hotels just for you'}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="tabs -pills-2 pt-0 js-tabs mb-30">
          <div className="tabs__controls row x-gap-10 y-gap-10 lg:x-gap-20">
            {filters.map((filter) => (
              <div key={filter.id} className="col-auto">
                <button
                  className={`tabs__button text-14 fw-500 px-20 py-8 rounded-100 js-tabs-button ${
                    activeFilter === filter.id ? 'is-tab-el-active' : ''
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="row x-gap-20 y-gap-20">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="col-xl-3 col-lg-3 col-sm-6">
              <div className="hotelsCard -type-1 hover-inside-slider">
                <div className="hotelsCard__image">
                  <div className="cardImage ratio ratio-1:1">
                    <div className="cardImage__content">
                      <div className="cardImage-slider rounded-4 overflow-hidden custom_inside-slider">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <img className="rounded-4 col-12 js-lazy" src={hotel.image} alt="hotel" />
                          </div>
                        </div>
                        <div className="cardImage-slider__pagination swiper-pagination"></div>
                        <div className="cardImage-slider__nav swiper-nav">
                          <button className="cardImage-slider__prev swiper-prev">
                            <i className="icon icon-chevron-left text-12"></i>
                          </button>
                          <button className="cardImage-slider__next swiper-next">
                            <i className="icon icon-chevron-right text-12"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist button */}
                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>

                  {/* Category badge */}
                  <div className="cardImage__leftBadge">
                    <div className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                      hotel.category === 'luxury' ? 'bg-yellow-1 text-dark-1' :
                      hotel.category === 'boutique' ? 'bg-blue-1 text-white' :
                      hotel.category === 'business' ? 'bg-dark-1 text-white' :
                      'bg-green-2 text-white'
                    }`}>
                      {hotel.category}
                    </div>
                  </div>
                </div>

                <div className="hotelsCard__content mt-10">
                  <div className="d-flex items-center lh-14 mb-5">
                    <div className="text-14 text-light-1">{hotel.location}</div>
                    <div className="size-3 bg-light-1 rounded-full ml-10 mr-10"></div>
                    <div className="text-14 text-light-1">
                      <i className="icon-star text-yellow-1 text-10 mr-5"></i>
                      {hotel.rating} ({hotel.reviews})
                    </div>
                  </div>

                  <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                    <Link href={`/hotel-single-v1/${hotel.id}`}>
                      <span>{hotel.name}</span>
                    </Link>
                  </h4>

                  {/* Amenities */}
                  <div className="d-flex items-center mt-5">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <div key={index} className="text-12 text-light-1 mr-15">
                        <i className="icon-check text-10 text-green-2 mr-5"></i>
                        {amenity}
                      </div>
                    ))}
                  </div>

                  <div className="d-flex items-center justify-between mt-20">
                    <div className="d-flex items-center">
                      <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                        {hotel.rating}
                      </div>
                      <div className="text-14 text-dark-1 fw-500 ml-10">
                        {hotel.rating >= 4.8 ? 'Exceptional' : 
                         hotel.rating >= 4.5 ? 'Excellent' : 
                         hotel.rating >= 4.0 ? 'Very Good' : 'Good'}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-16 text-dark-1 fw-500">${hotel.price}</div>
                      <div className="text-14 text-light-1">/ night</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <div className="row">
          <div className="col-12 text-center pt-30">
            <Link href="/hotel-list-v1" className="button -md -blue-1 bg-blue-1-05 text-blue-1">
              {t('hotel.viewAllRecommended') || 'View All Recommended Hotels'}
              <div className="icon-arrow-top-right ml-15" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedHotels;
