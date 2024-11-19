import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import './PostDetailPage.css'; // Import the CSS file

const PostDetailPage = () => {
  const { id } = useParams(); // Get post ID from the URL
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch the post details
  const fetchPost = async () => {
    const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
    if (error) {
      console.error("Error fetching post:", error);
    } else {
      setPost(data);
    }
  };

  // Fetch comments for the post
  const fetchComments = async () => {
    const { data, error } = await supabase.from("comments").select("*").eq("post_id", id).order("created_at");
    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
  };

  // Handle upvotes
  const handleUpvote = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);
    if (error) {
      console.error("Error upvoting post:", error);
    } else {
      fetchPost(); // Refresh post data
    }
  };

  // Add a comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { error } = await supabase.from("comments").insert({ post_id: id, content: newComment });
    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setNewComment(""); // Clear the input
      fetchComments(); // Refresh comments
    }
  };

  // Delete the post
  const handleDelete = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post:", error);
    } else {
      navigate("/"); // Redirect to home page
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.description}</p>
      <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "50%" }} />
      <p className="post-upvotes">Upvotes: {post.upvotes}</p>
      <button onClick={handleUpvote} style={{ marginLeft: "30px", color: "green" }}>Upvote</button>
      <button onClick={handleDelete} style={{ marginLeft: "30px", color: "red" }}>Delete Post</button>

      <h1>Comments</h1>
      <ul className="post-comments">
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default PostDetailPage;
