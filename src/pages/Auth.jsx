import React from 'react';
import AuthComp from '../components/Auth/Auth';

function Auth({ setUser }) {
  return (
    <>
      <AuthComp setUser={setUser} />
    </>
  );
}

export default Auth;
