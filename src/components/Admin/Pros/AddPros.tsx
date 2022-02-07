import React, { useState } from 'react';

import { pros } from '../../../API/request';
import { button, glassMorphism, input } from '../../../variableTailwind';
import InputPros from './InputPros';

function AddPros() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postalCode, setPostalCode] = useState<number>(0);
  const [city, setCity] = useState<string>('');
  const [siret, setSiret] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  console.log(name, email, password, address, postalCode, city, siret, phone);

  const prosInpt = [
    {
      value: name,
      type: 'text',
      placeholder: 'Nom de la société...',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setName((e.target as HTMLInputElement).value),
    },
    {
      value: email,
      type: 'email',
      placeholder: 'Email de la société',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setEmail((e.target as HTMLInputElement).value),
    },
    {
      value: password,
      type: 'password',
      placeholder: 'Mot de passe',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setPassword((e.target as HTMLInputElement).value),
    },
    {
      value: confirmPassword,
      type: 'password',
      placeholder: 'Confirmez votre mot de passe',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setConfirmPassword((e.target as HTMLInputElement).value),
    },
    {
      value: address,
      type: 'text',
      placeholder: 'Adresse de la société...',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setAddress((e.target as HTMLInputElement).value),
    },
    {
      value: postalCode,
      type: 'number',
      placeholder: 'Code Postale',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setPostalCode(Number((e.target as HTMLInputElement).value)),
    },
    {
      value: city,
      type: 'text',
      placeholder: 'Ville',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setCity((e.target as HTMLInputElement).value),
    },
    {
      value: siret,
      type: 'text',
      placeholder: 'Siret de la société',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setSiret((e.target as HTMLInputElement).value),
    },
    {
      value: phone,
      type: 'phone',
      placeholder: 'Téléphone de la société',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setPhone((e.target as HTMLInputElement).value),
    },
  ];

  const handlePostPros = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdPros = await pros.post({
      name: name,
      email: email,
      password: password,
      address: address,
      postal_code: postalCode,
      city: city,
      siret: siret,
      phone: phone,
    });
    console.log(createdPros);
  };

  return (
    <div className="flex flex-col items-end w-full">
      <div className="flex flex-col items-center justify-center w-5/6 h-full p-2">
        <form
          onSubmit={handlePostPros}
          className={`${glassMorphism} w-2/3 p-4 rounded-lg flex flex-wrap items-center justify-center`}>
          <h2 className="my-2 text-2xl text-background">Ajouter un pros</h2>
          {prosInpt.map((inpt, index: number) => (
            <InputPros
              widthLabel={
                index === 2 || index === 3 || index === 5 || index === 6
                  ? 'w-1/2'
                  : 'w-full'
              }
              key={index}
              name={inpt.type}
              className={`${input} w-full`}
              type={inpt.type}
              placeholder={inpt.placeholder}
              onChange={inpt.onChange}
            />
          ))}
          <button className={`${button}`}>Valider</button>
        </form>
      </div>
    </div>
  );
}

export default AddPros;
