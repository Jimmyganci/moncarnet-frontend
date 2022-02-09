import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { users } from '../../API/request';
import { button, glassMorphism, input } from '../../variableTailwind';
import Logo from '../Logo';
import ReturnButton from '../ReturnButton';

interface IAddressSelect {
  city: string;
  name: string;
  postcode: string;
  label: string;
}

interface IAddressList {
  geometry: object;
  properties: IAddressSelect;
}

function SignUp() {
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressList, setAddressList] = useState<IAddressList[]>([]);
  const [addressSelect, setAddressSelect] = useState<IAddressSelect>();
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  async function getAdresse() {
    const res = await axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${address}&type=housenumber&autocomplete=1`,
    );

    setAddressList(res.data.features);
  }

  useEffect(() => {
    getAdresse();
  }, [address]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (addressSelect) {
        try {
          const postUser = await users.post({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            address: addressSelect.name,
            phone: phone,
            postal_code: parseInt(addressSelect.postcode),
            city: addressSelect.city,
          });
          toast(`Merci ${postUser.firstname}, votre compte a bien été ajouté`);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } catch (err: any) {
          if (err.response.status === 409) toast.error('Cet email existe déjà!');
          if (err.response.status === 422)
            toast.error('Veuillez remplir tout les champs!');
        }
      }
    } else {
      toast.error('Vos mots de passe ne sont pas identiques!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-around h-full">
        <Logo/>
      <form
        className={`w-11/12 h-4/6 my-6 rounded-lg p-5 ${glassMorphism}`}
        onSubmit={(e: React.FormEvent) => handleSignUp(e)}>
        <h1 className="py-2 mb-4 text-2xl border-b border-background/25">
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
              addressList.map((address, index) => (
                <option key={index} value={JSON.stringify(address.properties)}>
                  {address.properties.label}
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
              value={(addressSelect && addressSelect.postcode) || ''}
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
              value={(addressSelect && addressSelect.city) || ''}
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
            className={`w-full ${input} `}
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label id="confirmPassword">
          Confirmez mot de passe
          <input
            className={`w-full ${input}`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className={`${button} w-1/2`} type="submit">
          Valider
        </button>
      </form>
      <div className='w-1/2 mb-5 flex justify-center'><ReturnButton target='/login-particular' /></div>
    </div>
  );
}

export default SignUp;
