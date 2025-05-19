import { useTranslations } from 'next-intl';
import { InputSelect, InputSwitch } from '@/components/Input';

export default function ProfileField({
  title,
  name,
  type,
  defaultValue,
  options,
  placeholder,
  onFieldChange,
  error,
  removeError,
}) {
  const t = useTranslations();

  return (
    <div className="profile-field">
      <div className="profile-field-input">
        <label className="text-gray-600">{title}:</label>

        {type !== 'switch' && type !== 'select' && (
          <input
            {...(type === 'number'
              ? { type: 'text', inputMode: 'numeric', pattern: '[0-9]*' }
              : { type })}
            name={name}
            defaultValue={defaultValue}
            className="profile-input"
            placeholder={placeholder}
            onChange={() => removeError(name)}
            onBlur={(e) => onFieldChange(e.target.value, name)}
            disabled={type === 'disabled'}
          />
        )}

        {type === 'switch' && (
          <InputSwitch
            name={name}
            defaultValue={defaultValue}
            onInputChange={onFieldChange}
          />
        )}

        {type === 'select' && (
          <InputSelect
            name={name}
            defaultValue={defaultValue}
            options={options}
            label={t('general.select')}
            styles="profile-select"
            onInputChange={onFieldChange}
          />
        )}
      </div>

      {error && (
        <p className="input-error-text body-6 profile-field-error">{error}</p>
      )}
    </div>
  );
}
