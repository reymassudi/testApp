import { useContext } from 'react';
import { WeekContext } from '@/utils/context';
import { InputCheckbox } from '@/components/Input';

import './test-card.css';

export default function TestCard({ title, description, testChecked }) {
  const { isRTL } = useContext(WeekContext);

  return (
    <div className="test-card-container">
      <div className="test-card-content bg-white grid grid-cols-[1fr_24px]">
        <div>
          <p className="text-gray-600 mb-1 h8">{title}</p>
          <p className={`${isRTL ? 'body-4' : 'body-3'} text-gray-600`}>
            {description}
          </p>
        </div>

        <div className="self-center justify-self-end">
          <InputCheckbox inputChecked={testChecked} />
        </div>
      </div>
    </div>
  );
}
