import React, { useState } from 'react';
import './Form.css';

interface IFormProps {
  onSubmit: (value: number) => void;
}

function Form(props: IFormProps) {
  const { onSubmit } = props;
  const [value, setValue] = useState('');

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const itemCount = parseInt(value);
    if (Number.isNaN(itemCount) || itemCount < 1) return;

    onSubmit(itemCount);
    setValue('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="Form">
      <input
        type="number"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
      <input type="submit" value="Checkout" />
    </form>
  );
}

export default Form;
