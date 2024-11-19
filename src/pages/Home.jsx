import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const Home = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest"); // Default sorting order

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    let query = supabase.from("posts").select("*");

    if (sortOrder === "latest") {
      query = query.order("created_at", { ascending: false });
    } else if (sortOrder === "most_popular") {
      query = query.order("upvotes", { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sortOrder]); // Refetch posts whenever the sorting order changes

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <span>Order By: </span>
        <button onClick={() => setSortOrder("latest")}>Latest</button>
        <button onClick={() => setSortOrder("most_popular")} style={{ marginLeft: "10px" }}>
          Most Popular
        </button>
      </div>
      {filteredPosts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h2>{post.title}</h2>
          <h3>Upvotes: {post.upvotes}</h3>
          <h3>Created At: {new Date(post.created_at).toLocaleString()}</h3>
          <Link to={`/post/${post.id}`}>View Post</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
