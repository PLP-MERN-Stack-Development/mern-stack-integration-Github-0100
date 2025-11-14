import React, { createContext, useState, useEffect } from 'react';
import { fetchPosts, fetchCategories } from '../api/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [postsList, setPostsList] = useState({ posts: [], total: 0, page: 1, pages: 1 });
  const [categories, setCategories] = useState([]);

  async function loadPosts(params = { page: 1, limit: 10 }) {
    const data = await fetchPosts(params);
    setPostsList(data);
  }

  async function loadCategories() {
    const data = await fetchCategories();
    setCategories(data);
  }

  useEffect(() => { loadPosts(); loadCategories(); }, []);

  const optimisticAddPost = (tempPost) => {
    setPostsList(prev => ({ ...prev, posts: [tempPost, ...prev.posts] }));
  };

  const replacePost = (realPost) => {
    setPostsList(prev => ({ ...prev, posts: prev.posts.map(p => p._id === realPost._id ? realPost : p) }));
  };

  return (
    <AppContext.Provider value={{
      postsList, setPostsList, loadPosts, categories, loadCategories,
      optimisticAddPost, replacePost
    }}>
      {children}
    </AppContext.Provider>
  );
};
