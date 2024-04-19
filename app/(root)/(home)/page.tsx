import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(now);

  return (
    <section className='flex  text-white size-full flex-col gap-10'>
      <div className='rounded-[20px] bg-hero bg-cover w-full h-[300px]'>
        <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <div className='flex flex-col justify-center align-start gap-2 size-full'>
            <h1 className='text-3xl font-extrabold lg:text-6xl'>{time}</h1>

            <p className='text-lg font-normal text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
