'use client';

import { useTranslation } from '../../../contexts/TranslationContext';
import Link from 'next/link';

const RecentlyViewed = () => {
  const { t } = useTranslation();

  const recentlyViewedHotels = [
    {
      id: 1,
      name: "ART HOTEL Narita",
      image: "/img/hotels/1.jpg",
      rating: 4.8,
      price: 72,
      location: "Narita, Japan",
      reviews: 3014
    },
    {
      id: 2,
      name: "Hotel Skypark Dongdaemun I",
      image: "/img/hotels/2.jpg", 
      rating: 4.6,
      price: 41,
      location: "Seoul, Korea",
      reviews: 2156
    },
    {
      id: 3,
      name: "RED PANDA HOUSE",
      image: "/img/hotels/3.jpg",
      rating: 4.7,
      price: 93,
      location: "Kyoto, Japan", 
      reviews: 1847
    },
    {
      id: 4,
      name: "Grand Plaza Hotel",
      image: "/img/hotels/4.jpg",
      rating: 4.5,
      price: 127,
      location: "Singapore",
      reviews: 2890
    }
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-between items-center mb-30">
          <div className="sectionTitle -md">
            <h2 className="sectionTitle__title">{t('hotel.recentlyViewed') || 'Recently Viewed'}</h2>
            <p className="sectionTitle__text mt-5 sm:mt-0">
              {t('hotel.recentlyViewedDesc') || 'Hotels you viewed recently'}
            </p>
          </div>
          <Link 
            href="/hotel-list-v1" 
            className="button -md -blue-1 bg-blue-1-05 text-blue-1"
          >
            {t('common.viewAll') || 'View All'}
            <div className="icon-arrow-top-right ml-15" />
          </Link>
        </div>

        <div className="row x-gap-20 y-gap-20">
          {recentlyViewedHotels.map((hotel) => (
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
                    <span>{hotel.name}</span>
                  </h4>

                  <div className="d-flex items-center mt-20">
                    <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                      {hotel.rating}
                    </div>
                    <div className="text-14 text-dark-1 fw-500 ml-10">Exceptional</div>
                    <div className="text-14 text-light-1 ml-10">({hotel.reviews} reviews)</div>
                  </div>

                  <div className="mt-5">
                    <div className="d-flex items-center">
                      <div className="text-16 text-dark-1 fw-500">${hotel.price}</div>
                      <div className="text-14 text-light-1 ml-5">/ night</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
