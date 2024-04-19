'use client';
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { toast } = useToast();
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const call = useCall();
  if (!call) {
    throw new Error('Something went wrong');
    toast({
      title: 'Something went wrong😢, please try again',
    });
  }
  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);
  return (
    <div className='flex h-screen w-[95%] mx-auto flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Meeting Setup </h1>
      <VideoPreview />
      <div className='flex h-16 items-center justify-center gap-3'>
        <label
          htmlFor='
            '
          className='flex items-center justify-center gap-2 font-normal'
        ></label>
        <input
          type='checkbox'
          checked={isMicCamToggleOn}
          onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
        />
        Join meeting with microphone and camera turn off
        <DeviceSettings />
      </div>
      <Button
        className='rounded-md bg-blue-1 px-4 py-2'
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
