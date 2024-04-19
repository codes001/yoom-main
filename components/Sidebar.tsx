'use client';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-col gap-6 flex-1'>
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              key={index}
              className={cn(
                'flex gap-4 rounded items-center p-4  justify-start',
                {
                  'bg-blue-1': isActive,
                }
              )}
            >
              <Image src={link.img} alt={link.label} width={20} height={20} />
              <p className='text-md font-semibold max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
