import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user session on component mount
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

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/" className="navbar-brand">
            🏋️ Bodybuilding Simulator
        </Link>
      </div>

      <div className="navbar-links">
        <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/dashboard">
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="navbar-auth">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <div className="user-profile">
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <span className="login-btn">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}