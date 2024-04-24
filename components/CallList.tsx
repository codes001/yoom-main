//@ts-nocheck
'use client';
import { useGetCalls } from '@/hooks/useGetCall';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  //Show Loader when the meeting data is still being fetched
  if (isLoading) return <Loader />;
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
  const { toast } = useToast();
  useEffect(() => {
    const getRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        toast({
          title: `${error}`,
        });
      }
    };

    if (type === 'recordings') getRecordings();
  }, [type, callRecordings]);
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? 'icons/upcoming.svg'
                : type === 'upcoming'
                ? 'icons/upcoming.svg'
                : 'icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 22) ||
              meeting.filename?.substring(0.15) ||
              'Personal room' ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? 'icons/play.svg' : undefined}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === 'recordings'
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            buttonText={type == 'recordings' ? 'Play' : 'Start'}
          />
        ))
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
