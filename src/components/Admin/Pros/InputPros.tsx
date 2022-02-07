import React from 'react';

interface IProps {
  type: string;
  className: string;
  name: string;
  onChange: (_e: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  widthLabel: string;
  minLength: number;
}

function InputPros({
  type,
  onChange,
  className,
  name,
  placeholder,
  widthLabel,
  minLength,
}: IProps) {
  return (
    <label className={widthLabel}>
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        className={`${className} valid:outline-primary-focus invalid:outline-red-500`}
        minLength={minLength}
      />
    </label>
  );
}

export default InputPros;
