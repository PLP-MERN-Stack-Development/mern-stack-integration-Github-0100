import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ background: '#222', color: '#fff', padding: '12px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 16 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>MERN Blog</Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Link to="/create" style={{ color: '#fff', textDecoration: 'none' }}>Create</Link>
        </div>
      </div>
    </nav>
  );
}
