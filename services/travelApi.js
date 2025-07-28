/**
 * Extended API service for cars, rentals, activities, and other travel services
 * This extends the base API to support other travel verticals beyond hotels
 */

import { apiRequest } from './api';

// Placeholder APIs - these would need to be implemented on the backend
// For now, we'll transform static data to match API structure

// Car rental API (placeholder - would need real endpoints)
export const carAPI = {
  // Get all available cars
  getCars: async () => {
    // TODO: Replace with real API endpoint when available
    // return await apiRequest('/cars/available');
    
    // For now, return transformed static data
    const carsData = require('../data/cars');
    return carsData.map(car => ({
      ...car,
      // Add any necessary transformations
      availability: 'available',
      location_details: {
        city: car.location,
        airport_pickup: true
      }
    }));
  },

  // Get car details by ID
  getCarDetails: async (carId) => {
    // TODO: Replace with real API endpoint
    // return await apiRequest(`/cars/${carId}`);
    
    const carsData = require('../data/cars');
    return carsData.find(car => car.id == carId);
  },
};

// Rental API (placeholder)
export const rentalAPI = {
  getRentals: async () => {
    // TODO: Replace with real API endpoint
    const rentalsData = require('../data/rentals');
    return rentalsData;
  },

  getRentalDetails: async (rentalId) => {
    const rentalsData = require('../data/rentals');
    return rentalsData.find(rental => rental.id == rentalId);
  },
};

// Activity API (placeholder)
export const activityAPI = {
  getActivities: async () => {
    // TODO: Replace with real API endpoint
    const activityData = require('../data/activity');
    return activityData;
  },

  getActivityDetails: async (activityId) => {
    const activityData = require('../data/activity');
    return activityData.find(activity => activity.id == activityId);
  },
};

// Flight API (placeholder)
export const flightAPI = {
  getFlights: async () => {
    // TODO: Replace with real API endpoint
    const flightsData = require('../data/flights');
    return flightsData;
  },

  searchFlights: async (searchParams) => {
    // TODO: Implement flight search
    const flightsData = require('../data/flights');
    return flightsData;
  },
};

// Tour API (placeholder)
export const tourAPI = {
  getTours: async () => {
    // TODO: Replace with real API endpoint
    const toursData = require('../data/tours');
    return toursData;
  },

  getTourDetails: async (tourId) => {
    const toursData = require('../data/tours');
    return toursData.find(tour => tour.id == tourId);
  },
};

// Cruise API (placeholder)
export const cruiseAPI = {
  getCruises: async () => {
    // TODO: Replace with real API endpoint
    const cruiseData = require('../data/cruise');
    return cruiseData;
  },

  getCruiseDetails: async (cruiseId) => {
    const cruiseData = require('../data/cruise');
    return cruiseData.find(cruise => cruise.id == cruiseId);
  },
};

// Data transformers for consistency
export const travelDataTransformers = {
  // Transform car data to ensure consistency
  transformCar: (car) => ({
    ...car,
    image: car.slideImg?.[0] || '/img/cars/default.png',
    images: car.slideImg || [],
    rating: parseFloat(car.ratings) || 4.0,
    reviewCount: parseInt(car.numberOfReviews) || 0,
    pricePerDay: parseFloat(car.price) || 0,
  }),

  // Transform rental data
  transformRental: (rental) => ({
    ...rental,
    image: rental.slideImg?.[0] || '/img/rentals/default.png',
    images: rental.slideImg || [],
    rating: parseFloat(rental.ratings) || 4.0,
    reviewCount: parseInt(rental.numberOfReviews) || 0,
    pricePerNight: parseFloat(rental.price) || 0,
  }),

  // Transform activity data
  transformActivity: (activity) => ({
    ...activity,
    image: activity.slideImg?.[0] || '/img/activities/default.png',
    images: activity.slideImg || [],
    rating: parseFloat(activity.ratings) || 4.0,
    reviewCount: parseInt(activity.numberOfReviews) || 0,
    pricePerPerson: parseFloat(activity.price) || 0,
  }),
};

// Export all APIs
export default {
  car: carAPI,
  rental: rentalAPI,
  activity: activityAPI,
  flight: flightAPI,
  tour: tourAPI,
  cruise: cruiseAPI,
  transform: travelDataTransformers,
};
