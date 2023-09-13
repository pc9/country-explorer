import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Country Explorer',
  description: 'Country Explorer',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-gray-100`}>
        <header className='bg-white shadow-sm'>
          <div className='mx-auto flex max-w-7xl px-3 lg:px-9'>
            <Link
              href='/'
              title='Country Explorer'
              className='flex flex-row items-center py-2'
            >
              <Image
                src='/logo.png'
                width={56}
                height={56}
                alt='country explorer'
              />
              <span className='ml-2 font-semibold'>Country Explorer</span>
            </Link>
          </div>
        </header>
        <main className='p-3 md:p-9'>{children}</main>
      </body>
    </html>
  );
}
