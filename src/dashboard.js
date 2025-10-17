// src/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  // Fetch posts on load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [token]);

  // Create new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([...posts, res.data]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>

      <h3>My Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;


