import { Suspense } from 'react';
import AddEvent from '@/app/ui/Calendar/AddEvent';

export default function AddSymptomPage() {
  return (
    <Suspense fallback={<div />}>
      <div className="add-event-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>

      <AddEvent />
    </Suspense>
  );
}
