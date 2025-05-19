'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import SymptomItem from '@/components/calendar/SymptomItem';
import { addSymptom } from '@/actions/calendar';

import { urls } from '@/utils/constants/navigation';
import './calendar.scss';

export default function AddSymptom() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const onSelectSymptom = (item) => {
    const tempSymptoms = [...selectedSymptoms];
    const hasItem = tempSymptoms.indexOf(item);
    if (hasItem > -1) {
      tempSymptoms.splice(hasItem, 1);
    } else {
      tempSymptoms.push(item);
    }

    setSelectedSymptoms(tempSymptoms);
  };

  const onSubmitSymptoms = async () => {
    setLoading(true);
    const { ok } = await addSymptom({ symptoms: selectedSymptoms });

    if (ok) {
      router.push(urls.calendar);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="add-symptom">
      <h4 className="mt-6 ps-4">
        {t('general.add', { var: t('calendar.symptoms') })}
      </h4>
      <p className="mt-8 mb-10 ps-6 h7 text-gray-700">
        {t('calendar.add_symptom')}
      </p>

      <div className="symptoms-list">
        <SymptomItem type={'morning sickness'} onClick={onSelectSymptom} />
        <SymptomItem type={'swelling'} onClick={onSelectSymptom} />
        <SymptomItem type={'back pain'} onClick={onSelectSymptom} />
      </div>
      <div className="symptoms-list">
        <SymptomItem type={'frequent urination'} onClick={onSelectSymptom} />
        <SymptomItem type={'fatigue & low energy'} onClick={onSelectSymptom} />
        <SymptomItem type={'breast changes'} onClick={onSelectSymptom} />
      </div>
      <div className="symptoms-list">
        <SymptomItem type={'heartburn'} onClick={onSelectSymptom} />
        <SymptomItem type={'all is fine'} onClick={onSelectSymptom} />
      </div>

      <div className="flex w-full justify-center">
        <button
          className="button-ultraviolet"
          onClick={onSubmitSymptoms}
          disabled={!selectedSymptoms.length || loading}
        >
          {t('calendar.add_to_calendar')}
        </button>
      </div>
    </div>
  );
}
