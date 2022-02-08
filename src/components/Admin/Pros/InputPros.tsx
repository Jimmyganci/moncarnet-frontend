import React, { useEffect, useState } from 'react';

interface IProps {
  type: string;
  className: string;
  name: string;
  onChange: (_e: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  widthLabel: string;
  minLength: number;
  pattern?: string;
}

function InputPros({
  type,
  onChange,
  className,
  name,
  placeholder,
  widthLabel,
  minLength,
  pattern,
}: IProps) {
  const [constraint, setConstraint] = useState<string | undefined>('');

  const getPattern = () => {
    if (pattern === 'siret') {
      setConstraint('[0-9]{14}');
    } else if (type === 'tel') {
      setConstraint('[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}');
    } else {
      setConstraint(undefined);
    }
  };

  useEffect(() => {
    getPattern();
  }, []);

  return (
    <label className={widthLabel}>
      {pattern === 'siret' && (
        <p className="text-xs">{`(Format requis : 14 chiffres)`}</p>
      )}
      {type === 'password' && (
        <p className="text-xs ">{`(Merci d'utiliser 7 charactères minimum)`}</p>
      )}
      {type === 'tel' && <p className="text-xs ">{`Format: (XX-XX-XX-XX-XX)`}</p>}
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        className={`${className} valid:outline-primary-focus invalid:outline-red-500`}
        minLength={minLength}
        pattern={constraint}
      />
    </label>
  );
}

export default InputPros;
