import React from 'react';
import { useState } from 'react';
import './Dashboard.css'

const Dashboard = () => {  
  const [dataShow, setDataShow] = useState('');

  const handleLogin = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:8080/api/getDashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataShow(data.message)
    } else {
        const errorData = await response.json();
        console.error('Error al iniciar sesión:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  handleLogin();
  
  return (
    <div className="container-dashboard">
      <h2>Dashboard</h2>
      <p>Bienvenido al panel de control.</p>
      <p>{dataShow ? dataShow : "NO TIENES PERMISOS O TOKEN NO VÁLIDO"}</p>
    </div>
  );
};

export default Dashboard;