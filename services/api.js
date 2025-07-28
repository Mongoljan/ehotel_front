/**
 * Centralized API service for hotel booking application
 * Base URL: https://dev.kacc.mn/api/
 */

const API_BASE_URL = 'https://dev.kacc.mn/api';

// API error handler
const handleApiError = (error, endpoint) => {
  console.error(`API Error at ${endpoint}:`, error);
  throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
};

// Generic fetch wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    handleApiError(error, endpoint);
  }
};

// Hotel-related API calls
export const hotelAPI = {
  // Get all approved properties (replaces static hotels.js)
  getApprovedProperties: async () => {
    return await apiRequest('/properties/approved');
  },

  // Get property details by ID
  getPropertyDetails: async (propertyId) => {
    return await apiRequest(`/property-details/?property=${propertyId}`);
  },

  // Get property basic info
  getPropertyBasicInfo: async (hotelId) => {
    return await apiRequest(`/property-basic-info/${hotelId}/`);
  },

  // Get room prices for a hotel
  getRoomPrices: async (hotelId) => {
    return await apiRequest(`/room-prices/?hotel=${hotelId}`);
  },

  // Get final price for a room
  getFinalPrice: async (priceId) => {
    return await apiRequest(`/final-price/${priceId}/`);
  },

  // Get all required data (countries, cities, etc.)
  getAllData: async () => {
    return await apiRequest('/all-data/');
  },
};

// Booking-related API calls
export const bookingAPI = {
  // Create a new booking
  createBooking: async (bookingData) => {
    return await apiRequest('/bookings/create/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Change booking date
  changeBookingDate: async (bookingId, newDate) => {
    return await apiRequest('/bookings/changeDate/', {
      method: 'PUT',
      body: JSON.stringify({ booking_id: bookingId, new_date: newDate }),
    });
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    return await apiRequest('/bookings/cancel/', {
      method: 'PUT',
      body: JSON.stringify({ booking_id: bookingId }),
    });
  },

  // Confirm booking
  confirmBooking: async (bookingId) => {
    return await apiRequest('/bookings/confirm/', {
      method: 'PUT',
      body: JSON.stringify({ booking_id: bookingId }),
    });
  },
};

// Transform API data to match component expectations
export const dataTransformers = {
  // Transform API property to match static hotel data structure
  transformProperty: (apiProperty) => ({
    id: apiProperty.pk || apiProperty.id,
    title: apiProperty.name || apiProperty.title,
    location: `${apiProperty.city?.name || ''}, ${apiProperty.country?.name || ''}`,
    img: apiProperty.featured_image || apiProperty.image || '/img/hotels/default.png',
    slideImg: apiProperty.images?.map(img => img.image) || [apiProperty.featured_image || '/img/hotels/default.png'],
    ratings: apiProperty.average_rating || "4.5",
    numberOfReviews: apiProperty.review_count || "0",
    price: apiProperty.starting_price || "0",
    tag: apiProperty.is_featured ? "Featured" : "",
    delayAnimation: "100",
    city: apiProperty.city?.slug || "",
    category: "hotel",
    description: apiProperty.description || "",
    amenities: apiProperty.amenities || [],
    address: apiProperty.address || "",
  }),

  // Transform multiple properties
  transformProperties: (apiProperties) => {
    return apiProperties.map(dataTransformers.transformProperty);
  },
};

// Export default API instance
export default {
  hotel: hotelAPI,
  booking: bookingAPI,
  transform: dataTransformers,
};
