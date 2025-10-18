import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://blog-capstone-13z3.onrender.com";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/posts`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(""); setContent("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={addPost}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Add Post</button>
      </form>

      <h3>Posts</h3>
      {posts.length === 0 && <p>No posts yet</p>}
      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <h4>{p.title}</h4>
            <p>{p.content}</p>
            <button onClick={() => deletePost(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;


         


