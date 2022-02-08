import React, { useState } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '../../API/request';
import imageHome from '../../assets/photohome.svg';
import Return from '../../assets/return.png';
import { appear, glassMorphism, input } from '../../variableTailwind';
import Logo from '../Logo';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      //  connection to the particular interface
      login
        .particular({ email, password })
        .then((data) => {
          console.log(`User ${data} connected`);
          navigate('/particular/home');
        })
        .catch((err) => {
          if (err.response.status === 401) toast.error(`Mot de passe incorrect.`);
          if (err.response.status === 403)
            toast.error(
              `Ce compte a été supprimé. Veuillez utiliser un autre compte ou en créer un nouveau`,
            );
          else if (err.response.status === 404) toast.error(`Cette email n'existe pas.`);
        });
    } else {
      toast.error('Veuillez remplir les champs.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Link to="/" className="absolute">
        <button
          className={`p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-primary-hovered h-7 w-7 ml-2 ${appear}`}>
          <img src={Return} alt="return" className="w-full h-full" />
        </button>
      </Link>
      <div className="flex flex-col items-center justify-center h-1/2">
        <div
          className={`relative flex flex-col items-center w-4/5 rounded-lg h-2/3 max-w-lg ${glassMorphism}`}>
          <Logo />
          <img className="w-full pb-4 lg:p-0 h-2/3 lg:h-2/3" src={imageHome} alt="car" />
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center h-1/2 ${glassMorphism}`}>
        <h2 className={`w-1/2 text-2xl lg:text-3xl font-montserrat ${appear}`}>
          Accéder à mon compte
        </h2>
        <form
          className={`flex flex-col items-center w-full max-w-lg mt-4 ${appear}`}
          onSubmit={(e: React.FormEvent) => handleLogin(e)}>
          <input
            className={`w-3/4 p-2 mb-4 text-center border rounded-md bg-primary-hovered border-primary outline-primary-focus lg:mb-2 lg:h-1/6`}
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
            <Link to="/signup"><p><span className='hover:cursor-default'>Pas encore membre ?</span> <span className='underline lg:no-underline hover:underline'>Créer un compte</span></p></Link>
          </nav>
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
