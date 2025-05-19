import { useState } from 'react';
import { useTranslations } from 'next-intl';
import DatePicker from '@/components/Datepicker';
import { InputContained, InputSelect } from '@/components/Input';
import { getPregnancyWeekDates } from '@/utils/functions';

import './period-and-stage.scss';

export default function PeriodAndStage({
  className,
  onInputChange,
  weeks,
  labelOption,
  defaultValue,
}) {
  const t = useTranslations();
  const [date, setDate] = useState(defaultValue?.stage);

  const onDateChange = (value) => {
    setDate(value);
  };
  const onDateBlur = (value) => {
    onStageChange(value);
  };

  const onStageChange = (value) => {
    setDate(value);
    onInputChange(value, 'pregnancy_days');
  };

  return (
    <div className={`period-and-stage ${className}`}>
      <div className="last-period">
        <label>
          {t('pregnancy.last_period')}
          {labelOption ? (
            <span className="label-option">({labelOption})</span>
          ) : (
            ':'
          )}
        </label>

        <DatePicker
          name="last_period"
          defaultValue={defaultValue?.period}
          onDateChange={onInputChange}
          type="modal"
        />
      </div>

      <div>
        <label>
          {t('pregnancy.pregnancy_stage')}
          {labelOption ? (
            <span className="label-option">({labelOption})</span>
          ) : (
            ':'
          )}
        </label>

        <div className="grid grid-cols-[minmax(0,_1fr)_24px_minmax(0,_1fr)] gap-2">
          <InputSelect
            name="stage_week"
            options={weeks}
            label={t('pregnancy.weeks_placeholder')}
            styles="stage-week"
            contained
            hasSearch
            onInputChange={onStageChange}
            defaultValue={getPregnancyWeekDates(date)}
          />

          <p className="h8 text-ultraviolet self-center text-center">
            {t('general.or')}
          </p>

          <InputContained
            name="stage_day"
            placeholder={t('pregnancy.days_placeholder')}
            type="number"
            onInputBlur={onDateBlur}
            onInputChange={onDateChange}
            value={date}
          />
        </div>
      </div>
    </div>
  );
}
