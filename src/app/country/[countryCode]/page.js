import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCountryByCode({ countryCode }) {
  if (!countryCode) {
    return;
  }

  // fetch country data based on country code
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/alpha/${countryCode}`,
    { next: { revalidate: 3600 } }
  );
  return response.json();
}

async function Page({ params }) {
  const { countryCode } = params;
  let response;
  try {
    response = await getCountryByCode({ countryCode });
  } catch (error) {
    console.log(error);
  }

  // check for 404 and 400 errors
  if ([400, 404].includes(response?.status) || response?.message) {
    console.log(response);
    notFound();
  }

  let countryData;
  try {
    [countryData] = response || [];
  } catch (error) {
    console.log(error);
  }

  if (!countryData) {
    notFound();
  }

  const {
    name,
    flags,
    region,
    cca2,
    ccn3,
    cioc,
    cca3,
    currencies = {},
    capital,
    subregion,
    languages = {},
    timezones = [],
    continents = [],
  } = countryData || {};
  const codes = [cca2, ccn3, cioc, cca3].filter(Boolean).join(', ');
  const currenciesText = Object.values(currencies)
    .map(({ symbol, name }) => `${name} (${symbol})`)
    .join(', ');
  const languagesText = Object.values(languages).join(', ');
  return (
    <section className='container mx-auto md:-mt-7'>
      <div className='mx-auto mb-2 max-w-5xl'>
        <Link href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 48 48'
          >
            <path d='M0 0h48v48h-48z' fill='none' />
            <path
              fill='#999'
              d='M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z'
            />
          </svg>
        </Link>
      </div>
      <div className='mx-auto max-w-5xl overflow-hidden rounded bg-white shadow-md'>
        <div className=' flex  flex-col flex-wrap p-5 pb-0 md:flex-row md:items-start md:pt-10'>
          <div className='flex aspect-video flex-1 shrink-0 flex-row items-center justify-center overflow-hidden'>
            <Image
              priority
              src={flags?.svg}
              className='h-full w-auto'
              alt={flags?.alt || 'Flag'}
              width={468}
              height={263}
            />
          </div>
          <div className='mt-3 flex-1 md:mt-0 md:p-6 md:pt-0'>
            <h1 className='mb-5 text-lg md:text-2xl'>
              {name?.common}
              <span className='ml-2 text-base text-neutral-500 md:text-xl'>
                ({name?.official} - {region})
              </span>
            </h1>
            <div className='text-sm md:text-base'>
              <p className='mt-2'>
                <span className='font-semibold'>Capital</span> -{' '}
                {capital?.join(', ')}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Languages</span> -{' '}
                {languagesText}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Currencies</span> -{' '}
                {currenciesText}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Sub Region</span> - {subregion}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Timezones</span> -{' '}
                {timezones.join(', ')}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Continents</span> -{' '}
                {continents.join(', ')}
              </p>
              <p className='mt-2'>
                <span className='font-semibold'>Codes</span> - {codes}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-5 flex w-full pb-10 pl-5 pr-5'>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_GOOGLE_API_KEY
            }=${name?.common?.split(' ').join('+')},${name?.official
              ?.split(' ')
              .join('+')}`}
            width='600'
            height='450'
            title={`${name?.official} Map`}
            className='aspect-video w-full'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
