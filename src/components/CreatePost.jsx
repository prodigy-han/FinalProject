import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and Description are required!');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, description, imageUrl }]);

    if (error) {
      console.error('Error creating post:', error);
    } else {
      alert('Post created successfully!');
      setTitle('');
      setDescription('');
      setImageUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <h2>Create New Post</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description"
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter external image URL (optional)"
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;