import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Login() {
  const router = useRouter();

  // Handle Google login
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Login error:', error.message);
    }
  };

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push('/dashboard');
    };

    checkUser();
  }, [router]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to the Bodybuilding Simulator</h1>
        <p>Log in to access personalized bodybuilding advice and optimize your protein factory!</p>
        <button onClick={handleGoogleLogin} className="google-login-btn">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
