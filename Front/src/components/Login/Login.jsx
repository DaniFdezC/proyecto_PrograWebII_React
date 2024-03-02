import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Inicio de sesión exitoso:', data);
        localStorage.setItem("token", data.accessToken);
        navigate("/dashboard");
    } else {
        const errorData = await response.json();
        console.error('Error al iniciar sesión:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <div className="button-container">
        <button onClick={handleLogin}>Sign in</button>
        <button onClick={handleCreateUser}>Sign up</button>
      </div>
    </div>
  );
};

export default Login;