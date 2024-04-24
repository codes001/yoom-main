import { cn } from '@/lib/utils';
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { LayoutList, User } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const personalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [showParticipants, setShowParticipants] = useState(false);
  if (callingState !== CallingState.JOINED) return <Loader />;
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />;
      default:
        return <SpeakerLayout participantsBarPosition='right' />;
    }
  };
  const router = useRouter();
  return (
    <main className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='flex size-full relative items-center justify-center'>
        <div className='max-w-[1000px] flex size-full items-center'>
          <CallLayout />
        </div>

        <div
          className={cn('h-[calc(100vh-85px)] hidden ml-3', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-5 flex flex-wrap mx-auto w-[95%] sm:w-full items-center justify-center gap-5'>
        <CallControls
          onLeave={() => {
            router.push('/');
          }}
        />

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-lg'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-none bg-dark-1 text-white'>
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                >
                  {/* {item} */}
                  {item.toUpperCase()}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-blue-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <Button onClick={() => setShowParticipants((previous) => !previous)}>
          <div className='cursor-pointer rounded-full border-white bg-dark-2 px-4 py-2 hover:bg-dark-1'>
            <User />
          </div>
        </Button>

        {!personalRoom && <EndCallButton />}
      </div>
    </main>
  );
};

export default MeetingRoom;
