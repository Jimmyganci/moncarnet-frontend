import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { button, glassMorphism, input } from '../../variableTailwind';
import Logo from '../Logo';

function SignUp() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [addressSelect, setAddressSelect] = useState<any>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    address &&
      axios
        .get(
          `https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&autocomplete=1`,
        )
        .then((res) => res.data)
        .then((data) => setAddressList(data.features));
  }, [address]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const postUser: any = await axios.post('http://localhost:8000/api/users', {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          address: addressSelect.name,
          phone: phone,
          postal_code: parseInt(addressSelect.postcode),
          city: addressSelect.city,
        });
        setMessage(`Merci ${postUser.data.firstname}, votre compte a bien été ajouté`);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err: any) {
        if (err.response.status === 409) setMessage('Cette email existe déjà!');
      }
    } else {
      setMessage('Vos mot de passe ne sont pas identiques!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-around h-full">
      <Logo />
      <form
        className={`w-11/12 mt-4 rounded-lg p-2 ${glassMorphism}`}
        onSubmit={(e: React.FormEvent) => handleSignUp(e)}>
        <h1 className="pt-4 pb-4 mb-4 text-2xl border-b border-background/25">
          Créer mon compte
        </h1>
        <div className="flex">
          <label className="w-1/2" id="lastname">
            Nom
            <input
              className={`w-full ${input}`}
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label className="w-1/2">
            Prénom
            <input
              className={`w-full ${input}`}
              type="text"
              name="fistname"
              id="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
        </div>
        <label id="adress">
          Adresse complète
          <input
            className={`w-full ${input}`}
            type="text"
            name="address"
            id="adress"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        {address && (
          <select
            className="w-11/12 rounded-lg bg-background/30"
            onChange={(e) => setAddressSelect(JSON.parse(e.target.value))}>
            <option value="">{addressList.length} adresses trouvées</option>
            {addressList.length >= 0 &&
              addressList.map((el: any, index: any) => (
                <option key={index} value={JSON.stringify(el.properties)}>
                  {el.properties.label}
                </option>
              ))}
          </select>
        )}
        <div className="flex">
          <label className="w-1/2" id="postalCode">
            Code Postal
            <input
              className={`w-full ${input}`}
              type="number"
              name="postalCode"
              id="postalCode"
              readOnly
              value={addressSelect.postcode || ''}
            />
          </label>
          <label className="w-1/2" id="city">
            Ville
            <input
              className={`w-full ${input}`}
              type="text"
              name="city"
              id="city"
              readOnly
              value={addressSelect.city || ''}
            />
          </label>
        </div>
        <label id="email">
          Mail
          <input
            className={`w-full ${input}`}
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label id="email">
          Tel
          <input
            className={`w-full ${input}`}
            type="text"
            name="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label id="password">
          Mot de passe
          <input
            className={`w-full ${input} ${
              message === 'Vos mot de passe ne sont pas identiques!' && 'border-error-600'
            }`}
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label id="confirmPassword">
          Confirmez mot de passe
          <input
            className={`w-full ${input} ${
              message === 'Vos mot de passe ne sont pas identiques!' && 'border-error-600'
            }`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <p className={message.includes('Merci') ? 'text-green-500' : 'text-error-600'}>
          {message}
        </p>
        <button className={button} type="submit">
          Valider
        </button>
      </form>
    </div>
  );
}

export default SignUp;
