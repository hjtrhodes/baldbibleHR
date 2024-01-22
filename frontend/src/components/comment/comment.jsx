import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import baseUrl from '../../../util/baseUrl';
import './comment.css';

const Modal = ({ closeModal, comments, onDeleteComment, userId }) => (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              {onDeleteComment && userId === comment.userId && (
                <button className="commentbutton" onClick={() => onDeleteComment(comment._id)}>
                  Delete Comment
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

const Comments = ({ imageId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [showModal, setShowModal] = useState(false);
  const userId = window.localStorage.getItem('userId');

  const onDeleteComment = async (commentId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
      if (!confirmDelete) {
        return;
      }

      const url = `${baseUrl}/api/images/${imageId}/comments/${commentId}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(url, options);

      const response = await axios.get(`${baseUrl}/api/images/${imageId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  useEffect(() => {
    // Fetch existing comments for the image
    console.log('Fetching comments for imageId:', imageId);
    axios
      .get(`${baseUrl}/api/images/${imageId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Comments:', response);
        setComments(response.data || []); // Ensure comments is an array
      })
      .catch((error) => console.error('Error fetching comments:', error));
  }, [imageId, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.localStorage.getItem('token');

      // Check if the token is available
      if (!token) {
        // Token is missing, show alert and optionally redirect to the login page
        showLogoutAlert();
        return;
      }

      // Send a request to add a new comment
      const url = `${baseUrl}/api/images/${imageId}/comments`;
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
      const response = await axios.get(`${baseUrl}/api/images/${imageId}/comments`, {
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
    const token = window.localStorage.getItem('token');

    // Check if the token is available
    if (!token) {
      // Token is missing, show alert and optionally redirect to the login page
      showLogoutAlert();
      return;
    }

    // Continue with showing comments
    setShowModal(true);
  };

  const showLogoutAlert = () => {
    // Show an alert indicating the user has been logged out
    alert('You have been logged out.');

    // Optionally, redirect to the login page
    const goToLoginPage = window.confirm('Do you want to go to the login page?');
    if (goToLoginPage) {
      window.location.href = `/login`;
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
              rows={5}
              cols={60}
            />
          </label>
          <button className="commentbutton" type="submit">Add Comment</button>
        </form>
        <br />
        <button className="commentbutton" type="button" onClick={handleShowComments}>
          Show Comments
        </button>
        {showModal && <Modal closeModal={closeModal} comments={comments} onDeleteComment={onDeleteComment} userId={userId} />}
      </div>
    </div>
  );
};

export default Comments;

