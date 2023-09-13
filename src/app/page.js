import ReactQueryProvider from '@/app/lib/reactQuery';
import Countries from '@/app/components/Countries';

async function getCountries() {
  // fetch and cache all countries on server
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/all?fields=name,flags,cca2`,
    { next: { revalidate: 3600 } }
  );
  return response.json();
}

export default async function Home() {
  const countries = await getCountries();
  return (
    <ReactQueryProvider>
      <Countries countries={countries} />
    </ReactQueryProvider>
  );
}
