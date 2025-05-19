'use client';

import { useState } from 'react';

import CloseIcon from '@/public/icons/close.svg';
import './modal.scss';

export default function Modal({ buttonRef, className, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type={'button'}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden"
      >
        Open Modal
      </button>

      <div
        className={`modal-overlay ${className ? className : ''} ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
