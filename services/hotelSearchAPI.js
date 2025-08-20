'use client';

const API_BASE_URL = 'https://dev.kacc.mn/api';

export class HotelSearchAPI {
  static async searchHotels(searchParams) {
    try {
      const params = new URLSearchParams();
      
      if (searchParams.location) params.append('location', searchParams.location);
      if (searchParams.check_in) params.append('check_in', searchParams.check_in);
      if (searchParams.check_out) params.append('check_out', searchParams.check_out);
      if (searchParams.adults) params.append('adults', searchParams.adults);
      if (searchParams.children) params.append('children', searchParams.children);
      if (searchParams.rooms) params.append('rooms', searchParams.rooms);
      if (searchParams.acc_type) params.append('acc_type', searchParams.acc_type);
      
      const url = `${API_BASE_URL}/search?${params.toString()}`;
      console.log('Searching hotels with URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  }
}

export default HotelSearchAPI;
