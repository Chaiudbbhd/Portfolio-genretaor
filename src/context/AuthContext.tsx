import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  user: any;
  isLoggedIn: boolean;
  credits: number | null;
  fetchCredits: (forceRefresh?: boolean) => Promise<void>;
  updateCredits: (newCredits: number) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);

  // Caching helpers
  const lastFetchRef = useRef<number>(0);
  const isFetchingRef = useRef<boolean>(false);

  // Fetch credits from DB (with caching)
  const fetchCredits = useCallback(
    async (forceRefresh = false) => {
      if (!user) return;

      const now = Date.now();

      // Avoid redundant requests if fetched within 30s
      if (!forceRefresh && now - lastFetchRef.current < 30000) {
        // console.log("🔁 Using cached credits");
        return;
      }

      // Prevent concurrent fetches
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("credits")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (data) {
          setCredits(data.credits);
          lastFetchRef.current = now;
        }
      } catch (err) {
        console.error("❌ Failed to fetch credits:", err);
      } finally {
        isFetchingRef.current = false;
      }
    },
    [user]
  );

  // Update credits in state manually after purchase
  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
    lastFetchRef.current = Date.now(); // update cache timestamp
  };

  // Initialize auth + credits
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user ?? null);
      if (data.user) {
        await fetchCredits(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchCredits(true);
        } else {
          setCredits(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchCredits]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(null);
    lastFetchRef.current = 0;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        credits,
        fetchCredits,
        updateCredits,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
