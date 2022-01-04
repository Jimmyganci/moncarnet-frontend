import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import imageHome from '../../assets/photohome.svg';
import { glassMorphism, input } from '../../variableTailwind';
import Logo from '../Logo';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post(
          'http://localhost:8000/api/auth/particular/login',
          {
            email: email,
            password: password,
          },
          { withCredentials: true },
        )
        .then((res) => {
          res.data;
        })
        .then((data) => {
          console.log(`User ${data} connected`);
          navigate('/particular/home');
        })
        .catch((err) => {
          if (err.response.status === 401) setMessage(`Mot de passe incorrect.`);
          else if (err.response.status === 404) setMessage(`Cette email n'existe pas.`);
        });
    } else {
      setMessage('Veuillez remplir les champs.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div
          className={`relative flex flex-col items-center w-4/5 rounded-lg h-2/3 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 bg-background shadow-main`}>
          <Logo />
          <img className="absolute bottom-0" src={imageHome} alt="car" />
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center h-1/2 ${glassMorphism}`}>
        <h2 className="w-1/2 text-3xl font-montserrat">Accéder à mon compte</h2>
        <form
          className="flex flex-col items-center w-full mt-4"
          onSubmit={(e: React.FormEvent) => handleLogin(e)}>
          <input
            className={`w-3/4 p-2 mb-4 text-center border rounded-md bg-primary-hovered border-primary outline-primary-focus`}
            type="email"
            name="email"
            id="email"
            placeholder="Rentrez votre mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={`w-3/4 ${input}`}
            type="password"
            name="password"
            id="paassword"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <nav>
            <Link to="/signup">Pas encore membre ? Créer un compte</Link>
          </nav>
          <p className="text-error-600">{message}</p>
          <button
            className={`p-4 mt-4 duration-300 ease-in-out rounded-lg shadow-lg bg-primary hover:bg-primary-hovered`}
            type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
