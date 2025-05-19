'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import { SubmitInputButton, SubmitVoiceButton } from '@/components/Button';
import VoiceInput from '@/components/Button/SubmitVoiceButton/VoiceInput';
import { useVoiceRecorder } from '@/utils/context/VoiceRecorderContext';
import { onVoiceChat } from '@/actions/files';

import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

import CloseIcon from '@/public/icons/close.svg';
import ArrowLeft from '@/public/icons/arrow-curve-left-up.svg';
import './input-message.scss';

const InputMessage = ({
  tagMessage,
  name,
  isChat,
  onSubmit,
  id,
  loading,
  placeholder,
  replyMessage,
  setReplyMessage,
}) => {
  const t = useTranslations();
  const [error, setError] = useState('');
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const inputRef = useRef(null);

  const voiceRecorder = useVoiceRecorder();
  const waveform = voiceRecorder?.waveform || [];
  const recorded = voiceRecorder?.recorded;
  const hasMic = voiceRecorder?.hasMic;

  useEffect(() => {
    if (id || isChat) {
      setTimeout(() => {
        inputRef.current?.focus();
        resetTextArea();
      }, 200);
    }
  }, [id, isChat, inputRef, replyMessage]);

  useEffect(() => {
    if (tagMessage) {
      setMessage(tagMessage);
    }
  }, [tagMessage]);

  const resetTextArea = () => {
    setMessage('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.rows = 1;
      inputRef.current.scrollTop = 0;
      inputRef.current.style.height = '40px';
      inputRef.current.blur();
      setTimeout(() => inputRef.current.focus(), 50);
    }
    setRows(1);
  };

  const onInputButton = () => {
    if (isChat) {
      if (recorded) {
        onVoiceMessage();
      } else {
        onSubmit(inputRef.current.value);
        resetTextArea();
      }
    } else {
      redirect(`${urls.chat}?${searchQueries.chatQuery}=${message}`);
    }
  };

  const onVoiceMessage = async () => {
    setVoiceLoading(true);
    const chunks = voiceRecorder?.chunks;
    const { ok, error, data } = await onVoiceChat(chunks, t);

    setVoiceLoading(false);
    if (ok) {
      setMessage(data?.text);
      voiceRecorder.onResetRecorder();
    } else {
      setError(error);
    }
  };

  const onInputKeyDown = (e) => {
    if (e.repeat) return;
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter' && message && !loading) {
      onInputButton();
    }
  };

  const onCloseReply = () => {
    setReplyMessage(null);
  };

  return (
    <div className={`input-message${replyMessage ? ' has-reply' : ''}`}>
      {replyMessage && (
        <div className="body-3 reply-message">
          <ArrowLeft className="reply-icon rtl:scale-x-[-1]" />

          <div className="body-3 text-gray-600 reply-text">
            {replyMessage?.context}
          </div>

          <button className="w-auto h-auto" onClick={onCloseReply}>
            <CloseIcon />
          </button>
        </div>
      )}

      {!waveform?.length || message || !hasMic ? (
        <textarea
          name={name}
          className="input-message__input"
          placeholder={placeholder}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={inputRef}
          onKeyDown={onInputKeyDown}
          autoComplete="off"
          rows={rows}
        />
      ) : (
        <VoiceInput error={error} setError={setError} />
      )}

      {!isChat || recorded || message || !hasMic ? (
        <SubmitInputButton
          type="submit"
          onClick={onInputButton}
          disabled={(!message || loading) & (!recorded || voiceLoading)}
        />
      ) : (
        <SubmitVoiceButton
          type="submit"
          onClick={onInputButton}
          disabled={!message || loading}
        />
      )}
    </div>
  );
};

export default InputMessage;
