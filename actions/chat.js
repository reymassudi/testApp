'use client';

import { fetch_api } from '@/app/api/base_fetch_client';
import { apis, method } from '@/utils/constants/apis';
import { urls } from '@/utils/constants/navigation';
import { errorMessages } from '@/utils/constants/error-messages';

export async function onChatInput(body, id, router, setChats, token) {
  try {
    const url = id
      ? `${process.env.BASE_URL}${apis.chats}${id}/?stream=true`
      : `${process.env.BASE_URL}${apis.chat_new}?stream=true`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const reader = response.body.getReader();

    const decoder = new TextDecoder();
    let accumulatedText = '';

    let reading = true;

    while (reading) {
      const { value, done } = await reader.read();

      const chunk = decoder.decode(value);
      let textChunk = '';

      const regex = /{[^{}]+}/g;

      let jsonChunk, type;
      let match;
      while ((match = regex.exec(chunk)) !== null) {
        try {
          jsonChunk = JSON.parse(match[0]);

          type = jsonChunk?.type;

          if (type === 'Response') {
            textChunk = jsonChunk?.content;
            accumulatedText += textChunk;

            setChats((prevChats) => {
              const newChats = [...prevChats];
              const index = newChats.length - 1;
              newChats[index] = {
                ...newChats[index],
                context: accumulatedText,
                loading: false,
              };
              return newChats;
            });
          }

          if (type !== 'Analyze' && type !== 'Response') {
            let completeData, userMessageId;
            try {
              const data = JSON.parse(chunk);
              completeData = data?.Message;
              userMessageId = data?.last_prompt_id;
            } catch (e) {
              completeData = jsonChunk;
            }

            setChats((prevChats) => {
              const newChats = [...prevChats];
              const index = newChats.length - 1;
              if (userMessageId) {
                newChats[index - 1] = {
                  ...newChats[index - 1],
                  id: userMessageId,
                };
              }
              newChats[index] = {
                ...newChats[index],
                loading: false,
                ...completeData,
              };
              return newChats;
            });
            reading = false;
            return {
              ok: true,
              data: {
                conversationId: completeData?.conversation_id,
              },
            };
          }
        } catch (error) {
          console.error('Invalid JSON:', match[0]);
        }
      }

      if (done) {
        reading = false;
      }
    }

    return { data: '', ok: false, error: 'errMsg' };
  } catch (error) {
    console.log('error chatConversation', error);

    let errMsg;
    if (
      error === errorMessages?.conversation_not_found ||
      error === errorMessages?.conversation_is_deleted
    ) {
      errMsg = errorMessages.redirect_new_chat;
      router.push(urls.chat);
    }

    return { data: '', ok: false, error: errMsg };
  }
}

export async function getChatConversation(id, index = 0, router) {
  try {
    const { data, ok } = await fetch_api(
      `/api/chat/chats?id=${id}&index=${index}`,
      method.get,
    );

    if (!ok) {
      const detail = data?.detail;
      if (typeof detail === 'string') {
        throw detail;
      }
    }

    const reversedData = data?.messages?.length
      ? data?.messages?.reverse()
      : [];

    return {
      data: reversedData,
      totalPages: data?.total_items,
      ok,
    };
  } catch (error) {
    console.log('error getChatConversation', error);

    if (
      error === errorMessages?.conversation_not_found ||
      error === errorMessages?.conversation_is_deleted
    ) {
      router.push(urls.chat);
    }

    return {
      error: 'error',
    };
  }
}

export async function getChatHistory(index = 0) {
  try {
    const { data, ok } = await fetch_api(
      `/api/chat/history?index=${index}`,
      method.get,
    );

    return {
      data: data?.conversations,
      totalPages: data?.total_items,
      ok,
    };
  } catch (error) {
    console.log('error getChatHistory', error);

    return { data: [], ok: false };
  }
}

export async function deleteConversation(id) {
  try {
    return await fetch_api(`/api/chat/history?id=${id}`, method.delete);
  } catch (error) {
    console.log('error deleteConversation', error);

    return { ok: false };
  }
}

export async function renameConversation(text, id) {
  try {
    return await fetch_api(
      `/api/chat/history?id=${id}`,
      method.patch,
      JSON.stringify(text),
    );
  } catch (error) {
    console.log('error renameConversation', error);

    return { ok: false };
  }
}
