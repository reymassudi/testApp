'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InputSwitch } from '@/components/Input';
import { SubmitInputButton } from '@/components/Button';

import Close from '@/public/icons/close.svg';

export default function SpecialConditions() {
  const t = useTranslations();
  const [haveCondition, setHaveCondition] = useState(false);
  const [condition, setCondition] = useState('');

  const conditions = ['Name of the disease', 'Name of the disease'];

  const removeCondition = (index) => {};

  const onSwitchChange = (value) => {
    setHaveCondition(value);
  };

  return (
    <div>
      <div className="flex justify-between content-center w-full">
        <label className="text-gray-600">
          {t('pregnancy.special_conditions')}:
        </label>

        <InputSwitch name="haveCondition" onInputChange={onSwitchChange} />
      </div>

      {haveCondition && (
        <>
          <div className="relative mt-2">
            <input
              name="special_conditions"
              placeholder={t('pregnancy.special_conditions_placeholder')}
              className="input-contained"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />

            <SubmitInputButton
              type="button"
              className="input-submit-button"
              onClick={removeCondition}
              disabled={!condition}
            />
          </div>

          <div>
            {conditions.map((condition, index) => (
              <div
                className="special-condition body-3"
                key={`condition-${index}`}
              >
                <span>
                  {index + 1}. {condition}
                </span>

                <button
                  className="condition-remove"
                  type="button"
                  onClick={() => removeCondition(index)}
                >
                  <Close />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
