import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
          <button
            style={{
              marginRight: '2rem',
              padding: '1rem 2.5rem',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '1.5rem',
              border: 'none',
              background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(99,102,241,0.15)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => navigate('/salary-table')}
          >
            <span role="img" aria-label="admin" style={{ fontSize: '2.5rem', marginRight: '1rem' }}>🛡️</span>
            <span style={{ fontWeight: '600', letterSpacing: '1px' }}>Admin</span>
          </button>
          <button style={{
            padding: '1rem 2.5rem',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '1.5rem',
            border: 'none',
            background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
            color: '#fff',
            boxShadow: '0 4px 16px rgba(16,185,129,0.15)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span role="img" aria-label="user" style={{ fontSize: '2.5rem', marginRight: '1rem' }}>👤</span>
            <span style={{ fontWeight: '600', letterSpacing: '1px' }}>User</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
