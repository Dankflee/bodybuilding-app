import { supabase } from '../lib/supabase';

export default function Auth() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Login error:', error.message);
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-btn">
      <img src="/assets/google-logo.png" alt="Google Logo" />
      Sign in with Google
    </button>
  );
}
