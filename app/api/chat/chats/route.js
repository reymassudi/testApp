import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { chat_page_count } from '@/utils/constants';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();

  try {
    // const response = await fetch(
    //   `${process.env.BASE_URL}${id ? `${apis.chats}${id}/` : apis.chat_new}?stream=true`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${tk}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ question: text }),
    //   },
    // );
    const { data, response } = await auth_fetch(
      `${apis.chats}${id}/?stream=true`,
      method.post,
      body,
    );

    if (!response.ok) {
      return NextResponse.json(
        { data, ok: false },
        { status: response.status },
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: 'No stream data received', ok: false },
        { status: 500 },
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            controller.enqueue(encoder.encode(chunk));
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');

  const { searchParams } = new URL(request.url);
  const index = searchParams.get('index');
  const id = searchParams.get('id');

  const { data, response } = await auth_fetch(
    `${apis.chats}${id}/?limit=${chat_page_count}&index=${index}`,
    method.get,
    null,
    null,
    null,
    authHeader,
  );

  return NextResponse.json({ data, ok: response?.ok });
}
