'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MoodItem from '@/components/calendar/MoodItem';
import { addMood } from '@/actions/calendar';

import { urls } from '@/utils/constants/navigation';
import moods from '@/components/calendar/MoodItem/moods-list';
import './calendar.scss';

export default function AddMood() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const onMoodClick = (item) => {
    const tempMoods = [...selectedMoods];
    const hasItem = selectedMoods.findIndex((mood) => mood.mood === item.mood);

    if (hasItem > -1) {
      tempMoods.splice(hasItem, 1);
    } else {
      tempMoods.push(item);
    }

    setSelectedMoods(tempMoods);
  };

  const onScoreClick = (item) => {
    const tempMoods = [...selectedMoods];
    const hasItem = selectedMoods.findIndex((mood) => mood.mood === item.mood);

    if (hasItem > -1) {
      tempMoods[hasItem] = item;
    }

    setSelectedMoods(tempMoods);
  };

  const onSubmitMoods = async () => {
    setLoading(true);
    const { ok } = await addMood({ moods: selectedMoods });

    if (ok) {
      router.push(urls.calendar);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="add-mood">
      <h4 className="mt-6 ps-4 capitalize">
        {t('general.add', { var: t('calendar.your_mood') })}
      </h4>
      <p className="mt-8 mb-10 ps-6 h7 text-gray-700">
        {t('calendar.choose_feel')}
      </p>

      <div className="ps-9">
        <p className="h8 capitalize mood-category">
          🌞 {t('calendar.moods_positive')}:
        </p>

        <div className="mt-4 ps-5 moods-list">
          {moods?.positive?.map((mood) => (
            <MoodItem
              key={mood.value}
              mood={mood}
              onMoodClick={onMoodClick}
              onScoreClick={onScoreClick}
            />
          ))}
        </div>
      </div>

      <div className="ps-9 mt-6">
        <p className="h8 capitalize mood-category">
          🌧️ {t('calendar.moods_negative')}:
        </p>

        <div className="mt-4 ps-5 moods-list">
          {moods?.negative?.map((mood) => (
            <MoodItem
              key={mood.value}
              mood={mood}
              onMoodClick={onMoodClick}
              onScoreClick={onScoreClick}
            />
          ))}
        </div>
      </div>

      <div className="ps-9 mt-6">
        <p className="h8 capitalize mood-category">
          🌥️ {t('calendar.moods_neutral')}:
        </p>

        <div className="mt-4 ps-5 moods-list">
          {moods?.neutral?.map((mood) => (
            <MoodItem
              key={mood.value}
              mood={mood}
              onMoodClick={onMoodClick}
              onScoreClick={onScoreClick}
            />
          ))}
        </div>
      </div>

      <div className="px-9 mt-9 flex w-full justify-center">
        <button
          className="button-ultraviolet"
          onClick={onSubmitMoods}
          disabled={!selectedMoods.length || loading}
        >
          {t('calendar.add_to_calendar')}
        </button>
      </div>
    </div>
  );
}
