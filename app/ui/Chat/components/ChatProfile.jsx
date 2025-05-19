import Image from 'next/image';

export default function ChatProfile({ img }) {
  return (
    <div className="chat-profile mt-1">
      <Image src={img} width={32} height={32} alt="profile" />
    </div>
  );
}
