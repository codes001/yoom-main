import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard || Yoom',
  description: 'A video streaming application',
  icons: {
    icon: '/icons/logo.svg',
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='flex flex-col flex-1 px-6 pb-6 pt-28 min-h-screen max-md:pb-14 sm:px-14'>
          <div className='w-full'>{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
