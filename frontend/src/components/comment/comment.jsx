import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ imageId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch existing comments for the image
    axios.get(`/api/images/${imageId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [imageId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to add a new comment
      await axios.post(`/api/images/${imageId}/comments`, {
        userId: 'user123', // Replace with actual userId from authentication
        content: newComment,
      });

      // Refresh the comments after submitting a new comment
      const response = await axios.get(`/api/images/${imageId}/comments`);
      setComments(response.data);

      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <label>
          Add a comment:
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </label>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comments;
