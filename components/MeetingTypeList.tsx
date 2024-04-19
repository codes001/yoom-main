'use client';
import Image from 'next/image';
import HomeCard from './HomeCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  const user = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      if (!values.dateTime) {
        toast({
          title: 'Meeting date and time is required',
        });
        return;
      }
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create call');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting created successfully 🎊',
      });
    } catch (error) {
      toast({
        title: 'Failed to create new meeting 😥',
      });
      console.log(error);
    }
  };
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-green-1'
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Fix Meeting'
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-3'>
            <span className='text-base leading-wider text-sky-2'>
              Meeting Description
            </span>

            <Textarea
              className='border-0 bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <span className='text-base leading-wider text-sky-2'>
              Pick a date and time
            </span>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={20}
              timeCaption='time'
              dateFormat='MMMM d, yyyyy h:mm aa'
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Meeting created'
          className='text-center'
          buttonText='Copy link'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Meeting link copied' });
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
        />
      )}

      <HomeCard
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className='bg-dark-3'
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View Recordings'
        description='See all your recordings here'
        handleClick={() => router.push('/recordings')}
        className='bg-blue-1'
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='bg-dark-4'
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start a new meeting'
        className='text-center'
        buttonText='Start Now'
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
