import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user session on app load
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar user={user} loading={loading} />

      {/* Main Content */}
      <main className="main-content">
        <Component {...pageProps} user={user} loading={loading} />
      </main>

      {/* Footer (optional) */}
      <footer className="footer">
        <p>© 2023 Bodybuilding Simulator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MyApp;