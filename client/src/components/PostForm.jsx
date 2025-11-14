import React, { useState, useContext } from 'react';
import { createPost } from '../api/api';
import { AppContext } from '../context/AppContext';

export default function PostForm() {
  const { optimisticAddPost, replacePost } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    // basic client validation
    if (!title || !content) return alert('Title and content required.');

    // optimistic temporary post
    const tempId = `temp-${Date.now()}`;
    const tempPost = {
      _id: tempId,
      title, content,
      author: { username: 'You' },
      createdAt: new Date().toISOString()
    };
    optimisticAddPost(tempPost);

    // prepare formdata
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('featuredImage', file);

    try {
      const realPost = await createPost(formData);
      // replace temp with server post
      replacePost(realPost);
      setTitle(''); setContent(''); setFile(null);
    } catch (err) {
      // rollback: remove temp by reloading posts or filtering
      alert('Create failed: ' + (err.response?.data?.message || err.message));
      window.location.reload(); // simple rollback
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Create</button>
    </form>
  );
}
