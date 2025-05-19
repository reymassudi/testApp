export default function TextInput({
  name,
  label,
  placeholder,
  type,
  error,
  className,
  labelOption,
  ref,
}) {
  return (
    <div className={className}>
      <label>
        {label}
        {labelOption && <span className="label-option">({labelOption})</span>}
      </label>

      <input
        {...(type === 'number'
          ? { type: 'text', inputMode: 'numeric', pattern: '[0-9]*' }
          : { type })}
        name={name}
        placeholder={placeholder}
        className={`input-contained ${error ? 'input-error' : ''}`}
        ref={ref}
      />

      {error && <p className="input-error-text mt-2">{error}</p>}
    </div>
  );
}
