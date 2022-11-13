import Navbar from '@/components/Navbar';


const Unauthorized = () => {
  return (
    <div>
      <Navbar />
      <section className="mt-40 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-6xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
              Unauthorized access
            </h2>
            <p className="mt-10 text-xl">
            Looks like you do not have the permission to view this page. If you think you should be able to access it, please write us an email.
            </p>
            <button className='mr-3 mt-10 rounded-full border-2 border-solid border-redc py-2 px-7 text-justify text-lg leading-6 text-redc'>Email us</button>
            <p className='text-base font-bold mt-5'>rafflr@ordoetchao.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;
