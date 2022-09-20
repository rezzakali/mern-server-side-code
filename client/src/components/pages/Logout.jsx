import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const result = await fetch('http://127.0.0.1:3001/user/logout', {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (result.status === 500 || !result) {
        window.alert('Logout later!');
      } else {
        window.alert('Logout successfully');
        setTimeout(() => {
          window.location.reload();
        }, 100);
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;
