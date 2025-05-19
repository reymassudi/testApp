'use client';

export default function DailyTest({ data }) {
  return (
    <div className="insight-details mx-5">
      <div className="py-2 px-4 text-gray-600">
        <p className="h8">{data?.title}</p>
        {data?.description && <p className="body-3">{data?.description}</p>}
      </div>
    </div>
  );
}
