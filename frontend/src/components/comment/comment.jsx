import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ imageId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // Fetch existing comments for the image
    console.log('Fetching comments for imageId:', imageId);
    axios.get(`http://localhost:8080/api/images/${imageId}/comments`, {
        'headers' : {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
      console.log('Comments:', response);
      setComments(response.data || []); // Ensure comments is an array
    })
      .catch(error => console.error('Error fetching comments:', error));
  }, [imageId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = window.localStorage.getItem("token");
  
      // Check if the token is available
      if (!token) {
        // Token is missing, ask user if they want to go to the login page
        const goToLoginPage = window.confirm("You need to be logged in to add a comment. Do you want to go to the login page?");
        
        if (goToLoginPage) {
          // Redirect to the login page
          window.location.href = `/login`;
          return; // Stop further execution
        } else {
          // User decided not to go to the login page
          return;
        }
      }
  
      // Send a request to add a new comment
      const url = `http://localhost:8080/api/images/${imageId}/comments`;
      const body = {
        content: newComment,
      };
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.post(url, body, options);
  
      // Refresh the comments after submitting a new comment
      const response = await axios.get(`http://localhost:8080/api/images/${imageId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data);
      console.log(response.data);
  
      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
    

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

      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments
