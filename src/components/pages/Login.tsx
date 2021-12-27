import axios from 'axios';
import React, { useState } from 'react';

import imageHome from '../../assets/photohome.svg';
import { button, glassMorphism, input } from '../../variableTailwind';

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
          className={`flex flex-col items-center w-4/5 rounded-lg h-2/3 ${glassMorphism}`}>
          <h1 className="w-3/4 mt-4 text-2xl font-montserrat">
            Mon carnet d&#39;entretien digitalisé
          </h1>
          <img src={imageHome} alt="car" />
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center h-1/2 ${glassMorphism}`}>
        <h2 className="w-1/2 text-3xl font-montserrat">Accéder à mon compte</h2>
        <form
          className="flex flex-col items-center w-full mt-4"
          onSubmit={(e: React.FormEvent) => handleLogin(e)}>
          <input
            className={`w-3/4 ${input}`}
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
          <button className={button} type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
