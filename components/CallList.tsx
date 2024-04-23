'use client';
import { useGetCalls } from '@/hooks/useGetCall';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MeetingCard from './MeetingCard';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;

      default:
        // Return empty array when there are no calls found
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Call found';
      case 'recordings':
        return 'No recordings found';
      case 'upcoming':
        return 'No upcoming calls';

      default:
        // Return an empty string
        return '';
    }
  };

  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => <MeetingCard />)
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
