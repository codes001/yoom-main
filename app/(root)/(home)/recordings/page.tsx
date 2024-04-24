import CallList from '@/components/CallList';
import React from 'react';

const Recordings = () => {
  return (
    <section className='flex  text-white size-full flex-col gap-10'>
      <h1 className='text-2xl font-bold'>Recordings</h1>

      <CallList type='recordings' />
    </section>
  );
};

export default Recordings;
