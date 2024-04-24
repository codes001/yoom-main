import { useUser } from '@clerk/nextjs';
import React from 'react';

interface TableType {
  title: string;
  description: string;
}
const Table = ({ title, description }: TableType) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);
const PersonalRoom = () => {
  const { user } = useUser();
  return (
    <section className='flex  text-white size-full flex-col gap-10'>
      <h1 className='text-2xl font-bold'>Personal Meeting Room</h1>

      <div className='flex w-full flex-col gap-5 xl:max-w-[900px]'>
        <Table
          title='Topic'
          description={`${user?.username}'s Personal meeting room `}
        />
      </div>
    </section>
  );
};

export default PersonalRoom;
