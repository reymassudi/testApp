'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InputMessage } from '@/components/Input';

export default function AskMeCard() {
  const t = useTranslations();
  const [message, setMessage] = useState('');

  const data = [t('home.ask_me_food'), t('home.ask_me_sleep')];

  return (
    <div className="ask-me-card">
      <h4>{t('home.ask_me')}</h4>

      <div className="x-infinite-scroll-container chips smooth-scroll mt-2 mb-4">
        {data.map((item, index) => {
          return (
            <div
              className="x-infinite-scroll-item ask-me-chip body-3"
              key={`ask-me-${index}`}
              onClick={() => setMessage(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      <InputMessage
        tagMessage={message}
        name="ask"
        placeholder={t('home.chat_placeholder')}
      />
    </div>
  );
}
