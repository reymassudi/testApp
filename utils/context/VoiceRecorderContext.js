'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const VoiceRecorderContext = createContext(null);

export const VoiceRecorderProvider = ({ children }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recorded, setRecorded] = useState(false);
  const [waveform, setWaveform] = useState([]);
  const [duration, setDuration] = useState('00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [hasMic, setHasMic] = useState(false);

  const chunks = useRef([]);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);
  const startTimeRef = useRef(0);

  const startRecording = async () => {
    if (!mediaRecorder) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        source.connect(analyser);

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (ev) => chunks.current.push(ev.data);
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
        };

        setMediaRecorder(recorder);
        recorder.start();
        setRecorded(false);
        setIsRecording(true);
        startTimeRef.current = audioContext.currentTime;
        startWaveformUpdate();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorder.start();
      setRecorded(false);
      setIsRecording(true);
      startTimeRef.current = audioContextRef.current.currentTime;
      startWaveformUpdate();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecorded(true);
      setIsRecording(false);

      // Stop the microphone stream
      const stream = mediaRecorder.stream;
      stream.getTracks().forEach((track) => track.stop()); // <- Stops the mic

      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);

      // Clean up
      setMediaRecorder(null);
      audioContextRef.current?.close();
      audioContextRef.current = null;
    }
  };

  const startWaveformUpdate = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateWaveform = () => {
      analyserRef.current.getByteFrequencyData(dataArray);

      const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      const scaledHeight = (avg / 255) * 200;

      setWaveform((prev) => [...prev.slice(-17), scaledHeight]);

      const currentTime = audioContextRef.current.currentTime;
      const elapsedSeconds = currentTime - startTimeRef.current;
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = Math.floor(elapsedSeconds % 60);
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
        seconds,
      ).padStart(2, '0')}`;
      setDuration(formattedTime);

      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    updateWaveform();
  };

  const onResetRecorder = () => {
    setRecorded(false);
    setWaveform([]);
    chunks.current = [];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const hasMicrophone = devices.some(
            (device) => device.kind === 'audioinput',
          );

          if (hasMicrophone) {
            setHasMic(true);
          }
        })
        .catch((error) => console.error('Error checking microphone:', error));
    }
  }, []);

  return (
    <VoiceRecorderContext.Provider
      value={{
        startRecording,
        stopRecording,
        onResetRecorder,
        waveform,
        duration,
        recorded,
        isRecording,
        chunks,
        hasMic,
      }}
    >
      {children}
    </VoiceRecorderContext.Provider>
  );
};

export const useVoiceRecorder = () => {
  return useContext(VoiceRecorderContext);
};
