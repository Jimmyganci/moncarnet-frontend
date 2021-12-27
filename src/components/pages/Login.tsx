import React from 'react';

import imageHome from '../../assets/photohome.svg';

const Login = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div className="flex flex-col items-center w-4/5 rounded-lg h-2/3 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 bg-background shadow-main">
          <h1 className="w-3/4 mt-4 text-2xl font-montserrat">
            Mon carnet d&#39;entretien digitalisé
          </h1>
          <img src={imageHome} alt="car" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 h-1/2 bg-background shadow-main">
        <h2 className="w-1/2 text-3xl font-montserrat">Accéder à mon compte</h2>
        <form className="flex flex-col items-center w-full mt-4">
          <input
            className="w-3/4 p-2 mb-4 text-center border rounded-md bg-primary-hovered border-primary"
            type="email"
            name="email"
            id="email"
            placeholder="Rentrez votre mail"
          />
          <input
            className="w-3/4 p-2 text-center border rounded-md bg-primary-hovered border-primary"
            type="password"
            name="password"
            id="paassword"
            placeholder="Entrez votre mot de passe"
          />
          <button className="p-4 mt-4 bg-primary" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
