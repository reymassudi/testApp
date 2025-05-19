import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { convertIsoToLocalTime } from '@/utils/functions';
import MessageOptionDropdown from './MessageOptionDropdown';
import ChatProfile from './ChatProfile';
import { useChat } from '@/utils/context/ChatContext';

import { chatTypes } from '@/utils/constants/enums';
import EllipseIcon from '@/public/icons/ellipse.svg';
import AiProfile from '@/public/img/chat/ai-profile.png';
import UserProfile from '@/public/img/chat/user-chat-profile.png';

export default function ChatMessage({ data, chatListRef }) {
  const { context, creation_time, creator, loading, reply_context } = data;

  const { setReplyMessage } = useChat();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownAnchorRef = useRef(null);

  const isAi = creator === chatTypes.ai;

  const onReply = () => {
    setIsDropdownOpen(false);
    setReplyMessage(data);
  };

  return (
    <div
      className={`${isAi ? 'ai-message' : 'user-message'}${isDropdownOpen ? ' text-selected' : ''}`}
    >
      {isAi && <ChatProfile img={AiProfile?.src} />}

      {loading ? (
        <div className="flex items-center">
          <div className="loading-dots">
            <div className="dot-1" />
            <div className="dot-2" />
            <div className="dot-3" />
          </div>
        </div>
      ) : (
        <div className={`chat-message${reply_context ? ' is-replied' : ''}`}>
          {reply_context ? (
            <div className="replied-text-container">
              <div className="body-4 replied-text">{reply_context}</div>
            </div>
          ) : null}

          <div className="text-message body-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{context}</ReactMarkdown>
            &nbsp; &nbsp; &nbsp;
            <div className="chat-dropdown" ref={dropdownAnchorRef}>
              <button
                className="chat-dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <EllipseIcon />
              </button>
            </div>
            <MessageOptionDropdown
              isAi={isAi}
              onReply={onReply}
              context={context}
              isOpen={isDropdownOpen}
              anchorEl={dropdownAnchorRef.current}
              scrollContainer={chatListRef.current}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>

          <p className="chat-time body-4 mt-2">
            {convertIsoToLocalTime(creation_time)}
          </p>
        </div>
      )}

      {!isAi && <ChatProfile img={UserProfile?.src} />}
    </div>
  );
}
