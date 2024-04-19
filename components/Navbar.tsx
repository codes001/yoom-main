import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-40 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-2'>
        <Image
          src='/icons/logo.svg'
          alt='Yoom'
          className='max-sm:size-10'
          width={30}
          height={30}
        />
        <p className='text-[24px] font-bold text-white max-sm:hidden'>Yoom</p>
      </Link>

      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
