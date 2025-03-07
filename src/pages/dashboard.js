import { useState } from 'react';
import AIAdvice from '../components/AIAdvice';
import FactoryForm from '../components/FactoryForm';

export default function Dashboard({ user, loading }) {
  const [activeTab, setActiveTab] = useState('advice'); // State for tab navigation

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to access the dashboard.</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard, {user.email}!</h1>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={activeTab === 'advice' ? 'active' : ''}
          onClick={() => setActiveTab('advice')}
        >
          Bodybuilding Advice
        </button>
        <button
          className={activeTab === 'factory' ? 'active' : ''}
          onClick={() => setActiveTab('factory')}
        >
          Protein Factory
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'advice' && (
          <div className="advice-section">
            <h2>Get AI-Powered Bodybuilding Advice</h2>
            <AIAdvice />
          </div>
        )}

        {activeTab === 'factory' && (
          <div className="factory-section">
            <h2>Optimize Your Protein Factory</h2>
            <FactoryForm />
          </div>
        )}
      </div>
    </div>
  );
}
