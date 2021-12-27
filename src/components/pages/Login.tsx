import axios from 'axios';
import React, { useState } from 'react';

import imageHome from '../../assets/photohome.svg';
import { glassMorphism, input } from '../../variableTailwind';
import Logo from '../Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/auth/login',
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      )
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div
          className={`relative flex flex-col items-center w-4/5 rounded-lg h-2/3 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 bg-background shadow-main`}>
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
          <button>Pasencore membre ? Créer un compte</button>
          <button
            className={`p-4 mt-4 duration-300 ease-in-out rounded-lg shadow-lg bg-primary hover:bg-primary-hovered`}
            type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
