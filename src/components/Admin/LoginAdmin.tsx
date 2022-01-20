import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../API/request';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginAdmin = await login.admin({ email, password });
    if (loginAdmin === 200) navigate('/admin/home');
  };
  return (
    <div>
      <div>
        <h1>Bienvenue sur votre interface admninistrateur</h1>
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
