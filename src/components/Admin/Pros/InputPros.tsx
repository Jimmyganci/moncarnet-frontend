import React from 'react';

interface IProps {
  type: string;
  className: string;
  name: string;
  onChange: (_e: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  widthLabel: string;
}

function InputPros({ type, onChange, className, name, placeholder, widthLabel }: IProps) {
  return (
    <label className={widthLabel}>
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        className={className}
      />
    </label>
  );
}

export default InputPros;
