import { useVoiceRecorder } from '@/utils/context/VoiceRecorderContext';

import MicrophoneIcon from '@/public/icons/microphone.svg';
import './submit-voice-button.scss';

export default function SubmitVoice() {
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();

  const voiceOnClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      onClick={voiceOnClick}
      className={`submit-voice-button${isRecording ? ' voice-recording' : ''}`}
    >
      <MicrophoneIcon />
    </button>
  );
}
