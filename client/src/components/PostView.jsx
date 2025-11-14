import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../services/api';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p style={{ color: '#666' }}>By {post.author?.username} — {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.featuredImage && <img src={post.featuredImage} alt={post.title} style={{ maxWidth: '100%', marginTop: 12 }} />}
      <div style={{ marginTop: 16, whiteSpace: 'pre-wrap' }}>{post.content}</div>

      <section style={{ marginTop: 24 }}>
        <h4>Comments</h4>
        {post.comments?.length ? post.comments.map(c => (
          <div key={c._id} style={{ borderTop: '1px solid #eee', paddingTop: 8 }}>
            <strong>{c.user?.username || 'anon'}</strong>
            <p style={{ margin: 4 }}>{c.content}</p>
          </div>
        )) : <p>No comments</p>}
      </section>
    </article>
  );
}
