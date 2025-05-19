export default function InputContained({
  name,
  label,
  placeholder,
  type,
  error,
  className,
  onInputBlur,
  onInputChange,
  value,
  labelOption,
}) {
  return (
    <div className={className}>
      {label && (
        <label>
          {label}{' '}
          {labelOption && <span className="label-option">({labelOption})</span>}
        </label>
      )}

      <input
        {...(type === 'number'
          ? { type: 'text', inputMode: 'numeric', pattern: '[0-9]*' }
          : { type })}
        name={name}
        placeholder={placeholder}
        className={`input-contained ${error ? 'input-error' : ''}`}
        {...(onInputBlur
          ? { onBlur: (e) => onInputBlur(e.target.value, name) }
          : null)}
        {...(onInputChange
          ? { onChange: (e) => onInputChange(e.target.value, name) }
          : null)}
        {...(onInputChange ? { value: value || '' } : null)}
      />

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}
