import './input-switch.scss';

const InputSwitch = ({ name, defaultValue, value, onInputChange }) => {
  return (
    <label className="input-switch">
      <input
        type="checkbox"
        name={name}
        {...(onInputChange
          ? { onChange: (e) => onInputChange(e.target.checked, name) }
          : null)}
        {...(defaultValue
          ? { defaultChecked: defaultValue }
          : { checked: value })}
      />
      <div className="input-switch-slider" />
    </label>
  );
};

export default InputSwitch;
