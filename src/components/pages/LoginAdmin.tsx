import React, { FormEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '../../API/request';
import logo from '../../assets/logo.svg';
import Return from '../../assets/return.png';
import { appear, button, glassMorphism, input } from '../../variableTailwind';

function LoginAdmin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginAdmin = await toast.promise(login.admin({ email, password }), {
      error: 'Email ou mot de passe invalide!',
    });
    if (loginAdmin === 200) navigate('/admin/home');
  };
  return (
    <div
      className={`${glassMorphism} min-h-screen flex justify-center flex-col items-center relative`}>
      <Link to="/" className="absolute top-0 left-0">
        <button
          className={`p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-primary-hovered h-7 w-7 ml-2 ${appear}`}>
          <img src={Return} alt="return" className="w-full h-full" />
        </button>
      </Link>
      <div
        className={`flex justify-center flex-col w-1/2 pt-5 pb-5 rounded-lg items-center ${glassMorphism} mt-5`}>
        <div className="flex items-center justify-center">
          <img src={logo} className="w-1/6 mr-2" alt="logo_mon_carnet" />
          <p>Mon Carnet</p>
        </div>
        <div className="mt-4 mb-4 text-xl text-white">
          <h1>Bienvenue sur votre interface admninistrateur</h1>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center w-full">
          <label className="w-full">
            <input
              className={`${input} text-center w-2/3`}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="w-full">
            <input
              className={`${input} text-center w-2/3`}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </label>
          <button className={`${button} w-1/3`} type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
