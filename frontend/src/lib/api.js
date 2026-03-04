import { supabase } from "@/lib/supabase";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Execute a function with retry logic
 * @param {Function} fn - Async function to execute
 * @param {number} retries - Number of retries left
 * @returns {Promise<any>}
 */
export const withRetry = async (fn, retries = MAX_RETRIES) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.message.includes('network')) {
      console.warn(`Request failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return withRetry(fn, retries - 1);
    }
    throw error;
  }
};

/**
 * Experts API Service
 */
export const expertsApi = {
  /**
   * Fetch all experts with optional filters
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>}
   */
  async getExperts(filters = {}) {
    return withRetry(async () => {
      let query = supabase
        .from("clinicians")
        .select(`
          *,
          profiles!inner (
            id,
            full_name,
            avatar_url,
            gender,
            bio
          )
        `)
        .order("avg_rating", { ascending: false });

      // Apply filters
      if (filters.specialization) {
        query = query.ilike("specialization", `%${filters.specialization}%`);
      }

      if (filters.clinicianType) {
        query = query.eq("clinician_type", filters.clinicianType);
      }

      if (filters.minExperience) {
        query = query.gte("years_of_experience", parseInt(filters.minExperience));
      }

      if (filters.acceptsNewPatients) {
        query = query.eq("accepts_new_patients", true);
      }

      if (filters.sessionType) {
        query = query.contains("session_types", [filters.sessionType]);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data
      return data.map(expert => ({
        ...expert,
        name: expert.profiles?.full_name || "Unknown",
        image: expert.profiles?.avatar_url || "/default-avatar.png",
        bio: expert.profiles?.bio || expert.bio,
        rate: expert.session_rate_cents ? (expert.session_rate_cents / 100).toFixed(2) : "0"
      }));
    });
  },

  /**
   * Get expert by ID
   * @param {string} id - Expert UUID
   * @returns {Promise<Object>}
   */
  async getExpertById(id) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("clinicians")
        .select(`
          *,
          profiles!inner (
            id,
            full_name,
            avatar_url,
            gender,
            bio,
            phone
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      return {
        ...data,
        name: data.profiles?.full_name || "Unknown",
        image: data.profiles?.avatar_url || "/default-avatar.png",
        rate: data.session_rate_cents ? (data.session_rate_cents / 100).toFixed(2) : "0"
      };
    });
  },

  /**
   * Get unique specializations
   * @returns {Promise<Array>}
   */
  async getSpecializations() {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("clinicians")
        .select("specialization")
        .not("specialization", "is", null);

      if (error) throw error;

      const uniqueSpecs = [...new Set(data.map(c => c.specialization))].filter(Boolean);
      return uniqueSpecs.sort();
    });
  }
};

/**
 * Bookings API Service
 */
export const bookingsApi = {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking information
   * @returns {Promise<Object>}
   */
  async createBooking(bookingData) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select("id")
        .single();

      if (error) throw error;
      return data;
    });
  },

  /**
   * Get user's bookings
   * @param {string} userId - User UUID
   * @returns {Promise<Array>}
   */
  async getUserBookings(userId) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          clinicians (
            profiles (full_name, avatar_url)
          )
        `)
        .eq("patient_id", userId)
        .order("scheduled_at", { ascending: true });

      if (error) throw error;
      return data;
    });
  }
};

/**
 * Mood API Service
 */
export const moodApi = {
  /**
   * Create mood entry
   * @param {Object} moodData - Mood information
   * @returns {Promise<Object>}
   */
  async createMoodEntry(moodData) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("mood_entries")
        .insert([moodData])
        .select()
        .single();

      if (error) throw error;
      return data;
    });
  },

  /**
   * Get user's mood history
   * @param {string} userId - User UUID
   * @returns {Promise<Array>}
   */
  async getMoodHistory(userId) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw error;
      return data;
    });
  }
};

/**
 * Generic API utilities
 */
export const apiUtils = {
  /**
   * Check if user is authenticated
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  /**
   * Get user profile
   * @param {string} userId - User UUID
   * @returns {Promise<Object>}
   */
  async getUserProfile(userId) {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    });
  }
};
