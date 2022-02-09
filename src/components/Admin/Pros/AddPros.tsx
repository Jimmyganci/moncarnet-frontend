import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
  const [validData, setValidData] = useState<boolean>(false);

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
      minLength: 7,
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setPassword((e.target as HTMLInputElement).value),
    },
    {
      value: confirmPassword,
      type: 'password',
      minLength: 7,
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
      minLength: 14,
      maxLength: 14,
      pattern: 'siret',
      placeholder: 'Siret de la société',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setSiret((e.target as HTMLInputElement).value),
    },
    {
      value: phone,
      type: 'tel',
      placeholder: 'Téléphone de la société',
      onChange: (e: React.FormEvent<HTMLInputElement>) =>
        setPhone((e.target as HTMLInputElement).value),
    },
  ];

  const handlePostPros = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
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
        if (createdPros.status === 200) {
          toast.success('Le professionnel a bien été ajouté.');
          setName('');
          setAddress('');
          setCity('');
          setPassword('');
          setConfirmPassword('');
          setPhone('');
          setSiret('');
          setPostalCode(0);
        }
      } else {
        toast.error('Les mots de passe ne sont pas identiques.');
      }
    } catch (err: any) {
      if (err.response.status === 409) toast.error('Cette email existe déjà!');
      if (err.response.status === 422) toast.error('Veuillez remplir tous les champs!');
    }
  };

  const validate = () => {
    if (name && email && password && address && postalCode && city && siret && phone) {
      setValidData(true);
    } else {
      setValidData(false);
    }
  };

  useEffect(() => {
    validate();
  }, [name, email, password, address, postalCode, city, siret, phone]);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="flex flex-col items-center justify-center w-5/6 h-full p-2">
        <form
          onSubmit={handlePostPros}
          className={`${glassMorphism} w-2/3 p-4 rounded-lg flex flex-wrap items-center justify-center`}>
          <h2 className="my-4 text-2xl text-background">Ajouter un professionnel</h2>
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
              minLength={inpt.minLength ? inpt.minLength : 0}
              pattern={inpt.pattern && inpt.pattern}
            />
          ))}
          <button
            disabled={!validData}
            className={`${
              !validData
                ? 'px-4 p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-primary/20 text-background/20'
                : button
            } `}>
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPros;
