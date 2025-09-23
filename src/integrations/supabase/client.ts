import { supabase } from "@/integrations/client";

// Fetch credits for a user by id
async function getUserCredits(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('credits')
    .eq('id', userId)
    .single();  // ensures you get a single object, like object+json

  if (error) {
    console.error('Error fetching credits:', error);
    return null;
  }

  return data?.credits;
}

// Usage
const credits = await getUserCredits('1c72a909-9fa0-42db-8f52-8ff9cbb246f0');
console.log('User credits:', credits);
