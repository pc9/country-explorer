import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CountryCard = memo(({ name, cca2, flags, priority }) => {
  const imageProp = priority ? { priority } : { loading: 'lazy' };
  return (
    <Link href={`/country/${cca2}`}>
      <div className='relative m-1 w-40 cursor-pointer overflow-hidden rounded bg-white shadow-sm transition hover:scale-105 hover:shadow-md md:m-3 md:w-64'>
        <div className='flex aspect-video flex-1 flex-row items-center justify-center overflow-hidden'>
          <Image
            src={flags.svg}
            priority={priority}
            {...imageProp}
            className='h-full w-auto'
            alt={flags.alt}
            width={256}
            height={144}
          />
        </div>
        <p className='p-3 pb-0 text-sm font-semibold md:text-base'>
          {name.common}
        </p>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap p-3 pt-0 text-xs font-semibold text-gray-500'>
          {name.official}
        </p>
      </div>
    </Link>
  );
});

CountryCard.displayName = 'CountryCard';

export default CountryCard;
