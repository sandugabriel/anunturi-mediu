import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const Contact = () => {
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 mt-40">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
            <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-6xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
              Tell us something
            </h2>
            <p className='text-xl mt-10'>
            If you want to find out more about what we do, or have a specific request, write us and we will see what we can do about it.
            </p>
            <button onClick={() => router.push('mailto:rafflr@ordoetchao.com')} className='mr-3 mt-10 rounded-full border-2 border-solid border-redc py-2 px-7 text-justify text-lg leading-6 text-redc'>Email us</button>
            <p className='text-base font-bold mt-5'>rafflr@ordoetchao.com</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
