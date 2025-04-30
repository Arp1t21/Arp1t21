// src/components/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { saveProfile } from '../../api';

function Profile({ user, setUser }) {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [description, setDescription] = useState(user?.description || '');
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  // Update local state when user prop changes
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setDescription(user.description || '');
      setPreviewAvatar(user.avatar || null);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('avatar').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim()) {
      setError('Имя пользователя и Email обязательны');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const updatedUser = await saveProfile(user.id, username, email, description, avatar);
      
      if (updatedUser.error) {
        setError(updatedUser.error);
      } else {
        // Update user data in localStorage and state
        const userData = { ...user, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // If setUser is provided, update the app-level user state
        if (setUser) {
          setUser(userData);
        }
        
        setSuccess('Профиль успешно обновлен');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Произошла ошибка при сохранении профиля');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="avatar-section">
          <h1>Профиль</h1>
          <div className="avatar-preview" onClick={triggerFileInput}>
            {previewAvatar ? (
              <img 
                src={previewAvatar.startsWith('http') ? previewAvatar : `http://localhost:3001${previewAvatar}`} 
                alt="Аватар" 
              />
            ) : (
              <div className="avatar-placeholder">Нет аватара</div>
            )}
          </div>
          <input 
            type="file" 
            id="avatar" 
            onChange={handleAvatarChange} 
            accept="image/*" 
          />
        </div>
        
        <div className="profile-line">
            
        </div>
        
        <div className="form-fields">
          <div className="form-group">
            <label className="form-lable" htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-lable" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-lable" htmlFor="description">О себе</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="button-group">
            <button type="button" className="save-btn" onClick={handleBack}>
              Назад
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;