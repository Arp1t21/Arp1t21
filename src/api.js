// src/api.js
const API_URL = 'http://localhost:3001/api';

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Ошибка сервера: ${response.status}` };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in login API call:', error);
    return { error: 'Ошибка соединения с сервером' };
  }
}

export async function register(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Ошибка сервера: ${response.status}` };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in register API call:', error);
    return { error: 'Ошибка соединения с сервером' };
  }
}

export async function checkSession(email, password) {
  try {
    const response = await fetch(`${API_URL}/check-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      return { error: 'Сессия истекла' };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in checkSession API call:', error);
    return { error: 'Ошибка соединения с сервером' };
  }
}

export async function saveProfile(userId, username, email, description, avatarFile) {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('description', description || '');
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    
    const response = await fetch(`${API_URL}/save-profile`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Ошибка сервера: ${response.status}` };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in saveProfile API call:', error);
    return { error: 'Ошибка соединения с сервером' };
  }
}

export async function getComments() {
  try {
    const response = await fetch(`${API_URL}/comments`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Ошибка сервера: ${response.status}` };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getComments API call:', error);
    return { error: 'Ошибка загрузки комментариев' };
  }
}

export async function addComment(userId, content) {
  try {
    const response = await fetch(`${API_URL}/add-comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `Ошибка сервера: ${response.status}` };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in addComment API call:', error);
    return { error: 'Ошибка добавления комментария' };
  }
}