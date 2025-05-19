import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { tag } = await request.json();

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true });
  }

  return NextResponse.json({ revalidated: false }, { status: 400 });
}

// await fetch(`${process.env.PUBLIC_BASE_URL}/api/revalidate`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   credentials: 'include',
//   body: JSON.stringify({ tag: tags.mother }),
// });
