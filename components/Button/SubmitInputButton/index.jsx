import ArrowUpActive from '@/public/icons/arrow-up-contained.svg';
import ArrowUp from '@/public/icons/arrow-up.svg';
import './submit-input-button.scss';

export default function SubmitInput({ onClick, disabled, type, className }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`submit-input-button ${className ? className : ''}`}
    >
      {disabled ? <ArrowUp /> : <ArrowUpActive />}
    </button>
  );
}
