import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Comments.css';
import { getComments, addComment } from '../../api';

const Comments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getComments();
      
      if (response.error) {
        setError(response.error);
      } else {
        setComments(response);
      }
    } catch (err) {
      console.error('Ошибка при загрузке комментариев:', err);
      setError('Не удалось загрузить комментарии. Проверьте подключение к серверу.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      setError('Сначала войдите в аккаунт!');
      return;
    }

    if (newComment.trim() === '') {
      setError('Комментарий не может быть пустым!');
      return;
    }

    setError('');
    setSuccess('');
    
    try {
      const result = await addComment(user.id, newComment);
      
      if (result.error) {
        setError(result.error);
      } else {
        setNewComment('');
        setSuccess('Комментарий успешно добавлен');
        fetchComments();
        // Если комментарии скрыты, показываем их после добавления нового
        if (!showComments) {
          setShowComments(true);
        }
      }
    } catch (err) {
      console.error('Ошибка при отправке комментария:', err);
      setError('Не удалось отправить комментарий. Проверьте подключение к серверу.');
    }
  };

  useEffect(() => {
    // При первой загрузке компонента загружаем комментарии
    fetchComments();
  }, []);

  return (
    <div className="comments-container">
      <div className="comment-form">
        <h3>Добавить комментарий</h3>
        {!user && (
          <div className="auth-prompt">
            <p>Чтобы оставить комментарий, необходимо <Link to="/auth" className="auth-link">войти в аккаунт</Link></p>
          </div>
        )}
        <div className="text-btn">
          <textarea
            placeholder={user ? "Ваш комментарий" : "Войдите, чтобы комментировать"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user}
          />
          <button 
            onClick={handleAddComment}
            disabled={!user}
            className={!user ? "btn-disabled" : ""}
          >
            Отправить
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      <div className="comments-list">
        <div className="cont">
          <h3>
            Комментарии 
            <span 
              className="toggle-comments" 
              onClick={() => setShowComments(prev => !prev)}>
              {showComments ? '▲' : '▼'}
            </span>
          </h3>
        </div>

        {showComments && (
          <div className="comment-list">
            {loading ? (
              <p className="loading-message">Загрузка комментариев...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                  <div className="comment-header">
                    {comment.avatar && (
                      <img 
                        src={`http://localhost:3001${comment.avatar}`} 
                        alt="Аватар" 
                        className="comment-avatar" 
                      />
                    )}
                    <p className="author">{comment.username}</p>
                    <span className="comment-date">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">Нет комментариев</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;