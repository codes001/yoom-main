'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import React from 'react';

interface TableType {
  title?: string;
  description?: string;
}
const Table = ({ title, description }: TableType) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row w-[95%] sm:w-36 '>
    <h1 className='text-base font-semibold text-white'>{title}</h1>
    <div className='text-blue-1 truncate text-wrap-w-full'>{description}</div>
  </div>
);
const PersonalRoom = () => {
  const { user } = useUser();
  const meetingID = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal='true`;

  const { toast } = useToast();

  const startMeeting = () => {};

  return (
    <section className='flex  text-white size-full flex-col gap-10'>
      <h1 className='text-2xl font-bold'>Personal Meeting Room</h1>

      <div className='flex w-full flex-col gap-5 xl:max-w-[900px]'>
        <Table title={`${user?.username}'s Personal meeting room `} />

        <Table title='Meeting ID:' description={meetingID!} />

        <Table title='Meeting Link:' description={meetingLink} />
      </div>

      <div className='flex gap-4'>
        <Button className='bg-blue-1' onClick={startMeeting}>
          Start Meeting
        </Button>

        <Button
          className='bg-green-1'
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);

            toast({
              title: 'Copied',
            });
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
