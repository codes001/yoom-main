import React, { ReactNode } from 'react';
import StreamVideoProvider from '@/providers/StreamClient';
import { Metadata } from 'next';
// import '@stream-io/video-react-sdk/dist/css/style.css';

export const metadata: Metadata = {
  title: 'Yoom',
  description: 'A video streaming application',
  icons: {
    icon: '/icons/logo.svg',
  },
};
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
