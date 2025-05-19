import AddMood from '@/app/ui/Calendar/AddMood';

export default function AddMoodPage() {
  return (
    <>
      <div className="add-mood-symptom-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>

      <AddMood />
    </>
  );
}
