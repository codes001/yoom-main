'use client';
import { useGetCalls } from '@/hooks/useGetCall';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  return <div>CallList</div>;
};

export default CallList;
