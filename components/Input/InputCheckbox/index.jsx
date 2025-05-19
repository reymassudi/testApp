'use client';

import { useState } from 'react';

import CheckSquare from '@/public/icons/check-square.svg';
import CheckSquareDone from '@/public/icons/check-square-done.svg';
import './input-checkbox.css';

const InputCheckbox = ({ inputChecked }) => {
  const [isChecked, setIsChecked] = useState(inputChecked);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <input readOnly type="checkbox" checked={isChecked} className="hidden" />
      <button
        onClick={handleChange}
        className={`custom-checkbox-bg ${isChecked ? 'custom-checkbox-checked' : ''}`}
      >
        {isChecked ? <CheckSquareDone /> : <CheckSquare />}
      </button>
    </>
  );
};

export default InputCheckbox;
