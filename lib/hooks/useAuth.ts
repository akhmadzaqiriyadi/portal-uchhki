import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Define the shape of the authentication state
interface AuthState {
  user: User | null;
  role: string | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const supabase = createClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    // Function to get the securely authenticated user and their role
    const fetchAuthenticatedUser = async () => {
      // Use getUser() to get the authenticated user directly from the Supabase server.
      // This is the recommended secure way.
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // If user is verified, fetch their role from our 'users' table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        setAuthState({ user, role: userData?.role || 'user', loading: false });
      } else {
        // If no user, reset the state
        setAuthState({ user: null, role: null, loading: false });
      }
    };

    // Fetch the user data when the component first mounts
    fetchAuthenticatedUser();

    // Listen for changes in authentication state (e.g., user signs in or out)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Whenever the auth state changes, re-fetch the user data securely.
      // This ensures the app state is always in sync and verified.
      await fetchAuthenticatedUser();
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return authState;
}