import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '24px auto', padding: '0 16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </>
  );
}
