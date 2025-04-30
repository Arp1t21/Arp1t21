import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Comments from './pages/Comments';
import { checkSession } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyUser() {
      const savedUser = localStorage.getItem('user');

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          const response = await checkSession(parsedUser.email, parsedUser.password);

          if (response.error) {
            localStorage.removeItem('user');
            setUser(null);
          } else {
            setUser(response);
          }
        } catch (error) {
          console.error("Ошибка при проверке сессии:", error);
          // Не удаляем пользователя при проблемах с сетью
        }
      }
      setLoading(false);
    }

    verifyUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return <div className="loading-screen">Загрузка...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} handleLogout={handleLogout} />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/auth" />} />
        <Route path="/comments" element={<Comments user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;