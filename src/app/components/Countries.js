'use client';

import {
  memo,
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import ResultNotFound from '@/app/components/ResultNotFound';
import CountryCard from '@/app/components/CountryCard';
import SearchBar from '@/app/components/SearchBar';

async function searchCountries({ countryName, signal }) {
  if (!countryName) {
    return;
  }

  // search by country name
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/name/${countryName}?fields=name,flags,cca2`,
    { signal }
  );
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }

  throw data;
}

const Countries = memo(({ countries: initCountries }) => {
  const [countryQuery, setCountryQuery] = useState();
  const previousCountriesData = useRef(initCountries);
  const deferredQuery = useDeferredValue(countryQuery);
  const cachedSearchCountries = useCallback(
    ({ queryKey, signal }) => {
      if (!deferredQuery) {
        return Promise.resolve(initCountries);
      }

      return searchCountries({ countryName: deferredQuery, signal });
    },
    [initCountries, deferredQuery]
  );
  const cacheKey = useMemo(
    () => ['countries', deferredQuery].filter(Boolean),
    [deferredQuery]
  );
  const {
    isError,
    data: countries,
    error,
    isFetching,
  } = useQuery(cacheKey, cachedSearchCountries, {
    cacheTime: 6 * 60 * 1000, // 6min cache time
    refetchOnWindowFocus: false,
    initialData: initCountries,
    retry: false,
    refetchOnReconnect: false,
    networkMode: 'always',
    keepPreviousData: true, // with this flag enabled query should always return previous query data
  });
  // store previous iteration query data
  previousCountriesData.current = !isFetching
    ? countries
    : previousCountriesData.current;
  const errorMessage = isError && error?.message;
  const fetchFailed = errorMessage === 'Failed to fetch';
  const cards = useMemo(() => {
    // added this check to avoid rendering whole list while fetching
    // if cached data is returned then render it immediately
    // while query sync is background and returns the result
    const data =
      isFetching && countries?.length === initCountries.length
        ? previousCountriesData.current
        : countries;
    return (
      <div className='container mx-auto mt-9 flex flex-row flex-wrap justify-center'>
        {(data || []).map((country, index) => (
          <CountryCard key={country.cca2} {...country} priority={index < 10} />
        ))}
      </div>
    );
  }, [countries, isFetching, initCountries]);
  return (
    <>
      <SearchBar
        handleSearchChange={setCountryQuery}
        errorMessage={errorMessage}
        fetchFailed={fetchFailed}
        isFetching={isFetching}
        deferredQuery={deferredQuery}
      />
      {errorMessage && !fetchFailed ? (
        <ResultNotFound errorMessage={errorMessage} fetchFailed={fetchFailed} />
      ) : (
        cards
      )}
    </>
  );
});

Countries.displayName = 'Countries';

export default Countries;
