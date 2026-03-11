import { supabase } from "@/lib/supabase";

/**
 * Fetch all experts
 */
export const getExperts = async () => {
  const { data, error } = await supabase
    .from("clinicians")
    .select(`
      *,
      profile:profiles!clinicians_profile_id_fkey (
        id,
        full_name,
        avatar_url,
        gender,
        bio,
        phone
      )
    `)
    .order("avg_rating", { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Fetch single expert
 */
export const getExpertById = async (id) => {
  const { data, error } = await supabase
    .from("clinicians")
    .select(`
      *,
      profile:profiles!clinicians_profile_id_fkey (
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

  return data;
};