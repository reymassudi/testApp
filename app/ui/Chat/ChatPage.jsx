'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ChatList from './components/ChatList';
import EmptyChat from './components/EmptyChat';
import { InputMessage } from '@/components/Input';
import { getChatConversation, onChatInput } from '@/actions/chat';
import { useChat } from '@/utils/context/ChatContext';
import { VoiceRecorderProvider } from '@/utils/context/VoiceRecorderContext';

import { urls } from '@/utils/constants/navigation';
import { chatTypes, searchQueries } from '@/utils/constants/enums';
import { errorMessages } from '@/utils/constants/error-messages';

import './chat.scss';

export default function ChatPage({ token }) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get(searchQueries.chatQuery);
  const id = searchParams.get(searchQueries.chatId);
  const isNew = searchParams.get(searchQueries.chatNew);

  const { isRTL, replyMessage, setReplyMessage, setRefreshHistory } = useChat();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(!!id || !!query); // if there is id, loading until data is fetched
  const [messageLoading, setMessageLoading] = useState(false); // answer user message
  const [pagination, setPagination] = useState({
    totalPages: 0,
    didPage: false,
    loading: false,
  });

  let queryFetched = false;

  const getChats = async (index) => {
    return await getChatConversation(id, index, router);
  };

  useEffect(() => {
    async function fetchData() {
      if (query && !queryFetched) {
        queryFetched = true;
        await onInputMessage(query);
      }
    }
    fetchData();
  }, [query]);

  useEffect(() => {
    if (!id && !query) {
      setLoading(false);
      setChats([]);
    }
    if (isNew === '1') {
      router.push(`${urls.chat}?${searchQueries.chatId}=${id}`, {
        shallow: true,
        scroll: false,
      });
    }

    if (id && isNew !== '1') {
      setChats([]);
      setLoading(true);
      async function fetchData() {
        const { data, totalPages } = await getChats(0);
        if (data && data.length) {
          setChats(data);
          setPagination({
            ...pagination,
            totalPages: totalPages,
            didPage: false,
          });
        }
        setLoading(false);
      }
      fetchData();
    }
  }, [id]);

  const onInputMessage = async (text) => {
    setMessageLoading(true);
    setPagination({ ...pagination, didPage: false });

    const dateString = new Date().toISOString();
    const newChats = [
      ...chats,
      {
        tempId: `${dateString}-user`,
        context: text,
        creator: chatTypes.human,
        creation_time: dateString,
        ...(replyMessage ? { reply_context: replyMessage.context } : null),
      },
    ];
    setChats(newChats);

    const newChatsAiLoading = [
      ...newChats,
      {
        tempId: `${dateString}-ai`,
        creator: chatTypes.ai,
        loading: true,
        creation_time: dateString,
      },
    ];
    setTimeout(() => {
      setChats(newChatsAiLoading);
    }, 200);

    const body = { question: text };
    if (replyMessage) {
      body.reply_to = replyMessage?.id;
      setReplyMessage(null);
    }

    const { data, ok, error } = await onChatInput(
      body,
      id,
      router,
      setChats,
      token,
    );

    if (ok && data && !id && error !== errorMessages.redirect_new_chat) {
      setRefreshHistory(true);
      router.push(
        `${urls.chat}?${searchQueries.chatId}=${data?.conversationId}&${searchQueries.chatNew}=1`,
        {
          shallow: true,
          scroll: false,
        },
      );
    }

    setMessageLoading(false);
  };

  const onGetNewPage = async () => {
    setPagination({ ...pagination, didPage: true, loading: true });
    if (!pagination?.loading) {
      const { data, totalPages, ok } = await getChats(chats?.length);

      if (ok && typeof data === 'object') {
        const tempChatArray = [...data, ...chats];
        setChats(tempChatArray);
        setPagination({
          totalPages: totalPages,
          didPage: true,
          loading: false,
        });
      }
    }
  };

  return (
    <div className="chat-page">
      {chats?.length ? (
        <ChatList
          chats={chats}
          onGetNewPage={onGetNewPage}
          pagination={pagination}
        />
      ) : (
        <>{loading ? <div /> : <EmptyChat />}</>
      )}

      <VoiceRecorderProvider>
        <div className="chat-input">
          <InputMessage
            isChat
            id={id}
            onSubmit={onInputMessage}
            loading={messageLoading}
            placeholder={t('chat.chat_placeholder')}
            replyMessage={replyMessage}
            setReplyMessage={setReplyMessage}
          />
          <p
            className={`text-gray-400 mt-2 text-center${isRTL ? ' body-5' : ' body-4'}`}
          >
            {t('chat.warning_text')}
          </p>
        </div>
      </VoiceRecorderProvider>
    </div>
  );
}
