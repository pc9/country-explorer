import { memo, useMemo } from 'react';
import Loader from '@/app/components/Loader';
import throttle from 'lodash/throttle';

const SearchBar = memo(
  ({
    handleSearchChange,
    errorMessage,
    fetchFailed,
    isFetching,
    deferredQuery,
  }) => {
    const throttledHandleSearchChange = useMemo(
      () =>
        throttle((ev) => {
          handleSearchChange(ev.target.value);
        }, 250),
      [handleSearchChange]
    );
    return (
      <div className=''>
        <div className='relative mx-auto flex w-full max-w-lg flex-row items-center justify-center text-gray-300 shadow-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute left-2 w-6'
            fill='none'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            className='w-full rounded border border-slate-100 p-3 pl-10 text-sm text-gray-500 outline-0 focus-within:shadow-sm'
            type='text'
            maxLength={150}
            name='country'
            placeholder='Search country....'
            onChange={throttledHandleSearchChange}
          />
          {isFetching &&
          typeof window !== 'undefined' &&
          !fetchFailed &&
          deferredQuery ? (
            <div className='absolute -bottom-10 -left-10 flex scale-50 flex-row items-center'>
              <Loader />
              <p className='ml-3 scale-100 text-2xl text-gray-700'>
                Searching...
              </p>
            </div>
          ) : null}
        </div>
        {fetchFailed ? (
          <p className='mx-auto mt-1 max-w-lg text-center text-xs font-semibold text-red-400'>
            {errorMessage}, there might be an issue with the internet :(
          </p>
        ) : null}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
