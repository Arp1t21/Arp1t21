// src/pages/Profile.jsx
import React from 'react';
import ProfileComponent from '../components/Profile/Profile';

function Profile({ user, setUser }) {
  return (
    <>
      <ProfileComponent user={user} setUser={setUser} />
    </>
  );
}

export default Profile;