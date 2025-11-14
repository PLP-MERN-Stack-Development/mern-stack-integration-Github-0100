import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function PostList() {
  const { postsList, loadPosts } = useContext(AppContext);
  const { posts, page, pages } = postsList;

  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts.map(p => (
          <article key={p._id}>
            <h3><Link to={`/posts/${p._id}`}>{p.title}</Link></h3>
            <p>By {p.author?.username} • {new Date(p.createdAt).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
      <div>
        <button disabled={page <= 1} onClick={() => loadPosts({ page: page - 1 })}>Prev</button>
        <span>{page}/{pages}</span>
        <button disabled={page >= pages} onClick={() => loadPosts({ page: page + 1 })}>Next</button>
      </div>
    </div>
  );
}
