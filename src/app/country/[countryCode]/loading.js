import Loader from '@/app/components/Loader';
export default function Loading() {
  return (
    <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center'>
      <Loader />
    </div>
  );
}
