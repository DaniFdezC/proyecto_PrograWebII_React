import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css'

const CreateUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password, roles : [role], email}),
            });
      
            if (response.ok) {
              alert("Usuario creado con éxito")
              navigate("/");
          } else {
              const errorData = await response.json();
              alert(errorData.message);
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
      };

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div>
            <h2>Sign up</h2>
            <label>
                New username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                New password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="rol-input-container">
                <label htmlFor="user-role">Role:</label>
                    <select id="user-role" name="user-role" onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                </select>
            </div>
            <br />
            <div className="button-container">
                <button onClick={handleSignUp}>Sign up</button>
                <button onClick={handleGoBack}>Go back</button>
            </div>
        </div>
    );
};

export default CreateUser;