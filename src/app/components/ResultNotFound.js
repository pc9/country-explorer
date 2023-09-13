import { memo } from 'react';
import Image from 'next/image';

const ResultNotFound = memo(({ errorMessage, fetchFailed }) => {
  const backendMessages = ['Not Found', 'Page Not Found'];
  // Overwriting backend message with a generic one.
  errorMessage = backendMessages.includes(errorMessage)
    ? 'No results found'
    : errorMessage;
  errorMessage = errorMessage || 'No results found';
  return (
    <div className='mx-auto mb-10 mt-20 flex flex-col items-center justify-center'>
      <Image
        alt='not found'
        className='w-full max-w-xs'
        src={'/not-found.png'}
        width={512}
        height={512}
      />
      <p className='mt-5 text-xl text-gray-500 md:text-5xl'>
        Sorry! {errorMessage} :(
      </p>
    </div>
  );
});

ResultNotFound.displayName = 'ResultNotFound';

export default ResultNotFound;
