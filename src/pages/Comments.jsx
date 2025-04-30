import React from 'react';
import { Link } from 'react-router-dom';
import CommentsComp from '../components/Comments/Comments';
import './Comments.css'; // Создадим стили для страницы комментариев

function Comments({ user }) {
  return (
    <div className="comments-page">
      <div className="comments-page-header">
        <h1>Комментарии</h1>
        <Link to="/" className="back-to-home">
          Вернуться на главную
        </Link>
      </div>
      <div className="comments-page-content">
        <CommentsComp user={user} />
      </div>
    </div>
  );
}

export default Comments;