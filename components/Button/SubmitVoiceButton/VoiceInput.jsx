import { useVoiceRecorder } from '@/utils/context/VoiceRecorderContext';

import TrashIcon from '@/public/icons/trash.svg';
import Waveform from '@/public/img/chat/waveform.svg';

export default function VoiceInput({ error, setError }) {
  const { waveform, recorded, duration, onResetRecorder } = useVoiceRecorder();

  const onReset = () => {
    setError('');
    onResetRecorder();
  };

  return (
    <div className={`voice-input${error ? ' input-error' : ''}`}>
      <button className="delete-voice" onClick={onReset}>
        <TrashIcon />
      </button>

      <div className="voice-duration h8">{duration}</div>

      <div className="waveform">
        {recorded ? (
          <Waveform />
        ) : (
          <div className="waveform">
            {waveform?.map((value, index) => (
              <div
                key={index}
                className="waveform-bar"
                style={{
                  height: `${Math.abs(value)}%`,
                  transition: 'height 0.1s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
