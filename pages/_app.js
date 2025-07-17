import '@/styles/globals.css';
import { createContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const UserContext = createContext();

export default function App({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    setSession(currentSession.data?.session ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
