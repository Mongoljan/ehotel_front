'use client';

import { useTranslation } from '../../../contexts/TranslationContext';
import Link from "next/link";
import Image from "next/image";

const APIHotelCard = ({ hotel, searchParams }) => {
  const { t } = useTranslation();

  // Helper function to validate image URL
  const isValidImageUrl = (imageObj) => {
    // Handle both old format (string) and new format (object with url)
    if (typeof imageObj === 'string') {
      return imageObj && imageObj.trim() !== '';
    }
    return imageObj && typeof imageObj === 'object' && imageObj.url && typeof imageObj.url === 'string' && imageObj.url.trim() !== '';
  };

  // Helper function to get image URL from either format
  const getImageUrl = (imageObj) => {
    if (typeof imageObj === 'string') {
      return imageObj;
    }
    return imageObj?.url || '';
  };

  // Helper function to get rating stars value
  const getRatingStars = (ratingObj) => {
    if (typeof ratingObj === 'number') {
      return ratingObj;
    }
    if (typeof ratingObj === 'object' && ratingObj?.label) {
      // Extract number from label like "2 stars" -> 2
      const match = ratingObj.label.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    }
    return 0;
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN', {
      style: 'currency',
      currency: 'MNT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate price per night
  const calculatePricePerNight = () => {
    const total = hotel.cheapest_room?.estimated_total_for_requested_rooms || hotel.min_estimated_total || 0;
    const nights = hotel.nights || 1;
    const rooms = hotel.rooms_possible || 1;
    return Math.round(total / nights / rooms);
  };

  // Calculate nights between dates
  const calculateNights = () => {
    if (searchParams?.check_in && searchParams?.check_out) {
      const checkIn = new Date(searchParams.check_in);
      const checkOut = new Date(searchParams.check_out);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return hotel.nights || 1;
  };

  return (
    <div className="col-12">
      <div className="hotel-card-clean">
        <div className="hotel-card-clean__container">
          {/* Image Section */}
          <div className="hotel-card-clean__image-wrapper">
            <div className="hotel-card-clean__image">
              {isValidImageUrl(hotel.images?.cover) ? (
                <>
                  <Image
                    width={300}
                    height={240}
                    className="hotel-card-clean__img"
                    src={getImageUrl(hotel.images.cover)}
                    alt={hotel.property_name || 'Hotel'}
                    onError={(e) => {
                      const fallbacks = ["/img/hotels/1.png", "/img/hotels/2.png", "/img/hotels/default.svg"];
                      const currentSrc = e.target.src;
                      const currentIndex = fallbacks.findIndex(fb => currentSrc.includes(fb.split('/').pop()));
                      if (currentIndex < fallbacks.length - 1) {
                        e.target.src = fallbacks[currentIndex + 1];
                      } else if (!currentSrc.includes('default.svg')) {
                        e.target.src = "/img/hotels/default.svg";
                      }
                    }}
                  />
                </>
              ) : (
                <div className="hotel-card-clean__image-placeholder">
                  <i className="icon-image" />
                </div>
              )}
            </div>
            
            {/* Heart/Favorite button */}
            <button className="hotel-card-clean__favorite">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.00002 13.8667L7.05335 12.9867C3.40002 9.72 1.33335 7.86667 1.33335 5.58333C1.33335 3.73 2.81335 2.25 4.66669 2.25C5.74002 2.25 6.76669 2.78333 7.41335 3.59167C8.06002 2.78333 9.08669 2.25 10.16 2.25C12.0134 2.25 13.4934 3.73 13.4934 5.58333C13.4934 7.86667 11.4267 9.72 7.77335 12.9867L8.00002 13.8667Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              </svg>
            </button>
          </div>
          
          {/* Content Section */}
          <div className="hotel-card-clean__content">
            {/* Header */}
            <div className="hotel-card-clean__header">
              <div className="hotel-card-clean__title-section">
                <h3 className="hotel-card-clean__title">
                  {hotel.property_name}
                </h3>
                
                {/* Rating */}
                {hotel.rating_stars && (
                  <div className="hotel-card-clean__rating">
                    <div className="hotel-card-clean__stars">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          className={`hotel-card-clean__star ${i < getRatingStars(hotel.rating_stars) ? 'hotel-card-clean__star--filled' : ''}`}
                        >
                          <path d="M7 0l1.545 4.755h5.005l-4.05 2.94 1.545 4.755L7 9.51 3.955 12.45l1.545-4.755-4.05-2.94h5.005z" fill="currentColor"/>
                        </svg>
                      ))}
                    </div>
                    {typeof hotel.rating_stars === 'object' && hotel.rating_stars.label && (
                      <span className="hotel-card-clean__rating-text">{hotel.rating_stars.label}</span>
                    )}
                  </div>
                )}

                {/* Location */}
                <div className="hotel-card-clean__location">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="hotel-card-clean__location-icon">
                    <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7.25 6 11 6 11S9.5 7.25 9.5 4.5C9.5 2.567 7.933 1 6 1ZM6 5.5C5.448 5.5 5 5.052 5 4.5S5.448 3.5 6 3.5S7 3.948 7 4.5S6.552 5.5 6 5.5Z" fill="currentColor"/>
                  </svg>
                  {hotel.location?.province_city && hotel.location?.soum ? (
                    <>
                      {hotel.location.province_city}, {hotel.location.soum}
                      {hotel.location.district && `, ${hotel.location.district} дүүрэг`}
                    </>
                  ) : (
                    t('hotel.location') || 'Location'
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="hotel-card-clean__price-section">
                <div className="hotel-card-clean__price-per-night">
                  {formatPrice(calculatePricePerNight())}
                </div>
                <div className="hotel-card-clean__price-label">
                  {t('hotel.perNight') || 'per night'}
                </div>
                <div className="hotel-card-clean__total-price">
                  {formatPrice(hotel.cheapest_room?.estimated_total_for_requested_rooms || hotel.min_estimated_total || 0)} total
                </div>
              </div>
            </div>

            {/* Room and Facilities Section */}
            <div className="hotel-card-clean__details">
              {/* Room info */}
              {hotel.cheapest_room && (
                <div className="hotel-card-clean__room-info">
                  <span className="hotel-card-clean__room-type">
                    {hotel.cheapest_room.room_type_label || 'Room Type'}
                  </span>
                  <span className="hotel-card-clean__capacity">
                    {hotel.cheapest_room.capacity_per_room_adults || 0} guests
                  </span>
                  {hotel.cheapest_room.available_in_this_type > 0 && (
                    <span className="hotel-card-clean__availability">
                      {hotel.cheapest_room.available_in_this_type} {t('hotel.roomsAvailable') || 'left'}
                    </span>
                  )}
                </div>
              )}

              {/* Top Facilities */}
              {hotel.general_facilities?.length > 0 && (
                <div className="hotel-card-clean__facilities">
                  {hotel.general_facilities.slice(0, 4).map((facility, index) => (
                    <span key={index} className="hotel-card-clean__facility">
                      {facility}
                    </span>
                  ))}
                  {hotel.general_facilities.length > 4 && (
                    <span className="hotel-card-clean__facility-more">
                      +{hotel.general_facilities.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="hotel-card-clean__action">
              <Link
                href={`/hotel-single-v1/${hotel.hotel_id || 'unknown'}?${new URLSearchParams({
                  check_in: searchParams?.check_in || '',
                  check_out: searchParams?.check_out || '',
                  adults: searchParams?.adults || '2',
                  children: searchParams?.children || '0',
                  rooms: searchParams?.rooms || '1'
                }).toString()}`}
                className="hotel-card-clean__button"
              >
                {t('hotel.viewDeal') || 'See availability'}
              </Link>
              
              {hotel.google_map && hotel.google_map !== 'link' && (
                <a 
                  href={hotel.google_map} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hotel-card-clean__map-link"
                >
                  {t('hotel.showOnMap') || 'Show on map'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIHotelCard;
