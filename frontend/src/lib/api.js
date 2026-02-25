// API base URL
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic API function to handle requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Counselor API functions
export const counselorApi = {
  // Get all counselors with optional filters
  getAllCounselors: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/counselors?${queryString}` : '/counselors';
    return apiRequest(endpoint);
  },

  // Get counselor by ID
  getCounselorById: (id) => {
    return apiRequest(`/counselors/${id}`);
  },

  // Get counselor availability
  getCounselorAvailability: (id) => {
    return apiRequest(`/counselors/${id}/availability`);
  },

  // Get all service types
  getServiceTypes: () => {
    return apiRequest('/counselors/service-types');
  },

  // Get all specialties
  getSpecialties: () => {
    return apiRequest('/counselors/specialties');
  },
};

// Booking API functions
export const bookingApi = {
  // Create a new booking
  createBooking: (bookingData) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get all bookings (admin only)
  getAllBookings: () => {
    return apiRequest('/bookings');
  },

  // Get booking by ID (admin only)
  getBookingById: (id) => {
    return apiRequest(`/bookings/${id}`);
  },

  // Get counselor bookings (admin only)
  getCounselorBookings: (counselorId) => {
    return apiRequest(`/bookings/counselor/${counselorId}`);
  },
};

// Health check
export const healthApi = {
  checkHealth: () => {
    return apiRequest('/health');
  },
};