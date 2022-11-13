import Navbar from '@/components/Navbar';

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <section className="mt-40 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-6xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
              404
            </h2>
            <p className="mt-10 text-xl">
            The page you are looking for does not exist, or we couldn’t find it. Try some of our other pages, they are great.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
