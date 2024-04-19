'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[265px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src='/icons/hamburger.svg'
            width={32}
            height={32}
            alt='Hamburger menu'
            className='cursor-pointer sm:hidden'
          />
        </SheetTrigger>

        <SheetContent side='left' className='border-none bg-dark-1'>
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/icons/logo.svg'
              alt='Yoom'
              className='max-sm:size-10 '
              width={25}
              height={25}
            />
            <p className='text-[20px] font-bold text-white'>Yoom</p>
          </Link>
          <div className='flex h-[calc(100vh-70px)] flex-col overflow-y-auto justify-between'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-5 pt-16 text-white'>
                {sidebarLinks.map((link, index) => {
                  const isActive = pathname === link.route;
                  return (
                    <SheetClose asChild key={index}>
                      <Link
                        href={link.route}
                        key={index}
                        className={cn(
                          'flex gap-4 rounded items-center p-4  w-full max-w-60 text-white',
                          {
                            'bg-blue-1': isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.img}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className='text-md font-semibold'>{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
