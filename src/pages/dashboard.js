import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import AIAdvice from '../components/AIAdvice';
import ProteinFactory from '../components/ProteinFactory';

export default function Dashboard() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      if (!user) {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect
  }

  const renderFeature = () => {
    switch (activeFeature) {
      case 'aiadvice':
        return <AIAdvice />;
      case 'proteinfactory':
        return <ProteinFactory />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <nav className="dashboard-nav">
          <button
            className={`dashboard-nav-item ${activeFeature === 'aiadvice' ? 'active' : ''}`}
            onClick={() => setActiveFeature('aiadvice')}
          >
            AI Fitness Advice
          </button>
          <button
            className={`dashboard-nav-item ${activeFeature === 'proteinfactory' ? 'active' : ''}`}
            onClick={() => setActiveFeature('proteinfactory')}
          >
            Protein Factory
          </button>
        </nav>
      </div>
      <div className="dashboard-content">
        {activeFeature ? (
          renderFeature()
        ) : (
          <div className="dashboard-welcome">
            <h1>Welcome to Your Fitness Dashboard</h1>
            <p>Select a feature from the sidebar to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
