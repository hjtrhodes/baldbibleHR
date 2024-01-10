import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'; // Import the necessary function
import Button from '../Button/Button';
import './comment.css'; // Import your CSS file

const Comments = ({ imageId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Fetch existing comments for the image
    console.log('Fetching comments for imageId:', imageId);
    axios.get(`http://localhost:8080/api/images/${imageId}/comments`, {
      headers: {
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
        // Token is missing, ask the user if they want to go to the login page
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

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="user-comments">
      <div className="comments-box">
        <form className="comments-form" onSubmit={handleCommentSubmit}>
          <label>
            <strong>Add a comment:</strong>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={5} // Adjust the number of rows as needed
              cols={60}
            />
          </label>
          <Button type="submit">Add Comment</Button>
        </form>
        <br></br>
        <Button type="submit" onClick={handleShowComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
        {showComments && (
          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="comment">
                <p className="comment-content">No comments yet.</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <p className="comment-content">{comment.content}</p>
                  <p className="comment-time">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
