import Navbar from '@/components/Navbar';
import useCart from '@/features/cart/hooks/useCart';

const Pricing = () => {

  const { addItemToCart } = useCart();

  const handleAddItem = (id: string, name: string, price: number, quantity: number) => addItemToCart({ id, name, price, quantity });

  return (
    <div>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Pricing
            </h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Each pack guarantees you a number of raffles*, over a period of 6 months.
            </p>
            <p text-sm>
            * Numbers and packages may be subjected to change in the future updates.
            </p>
          </div>
          <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
            <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
              {/* <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
                Best option for personal use & for your next project.
              </p> */}
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">$100</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>

              <ul role="list" className="mb-8 space-y-4 text-center">
                <li className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>1 raffle</span>
                </li>
                <button onClick={() => handleAddItem('basic', '1 raffle', 100, 1)} className='mr-3 mt-3 rounded-full border-2 border-solid border-redc py-2 px-5 text-justify text-sm leading-6 text-redc'>Add to cart</button>
              </ul>
            </div>

            <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">Standard</h3>
              {/* <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
                Relevant for multiple users, extended & premium support.
              </p> */}
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">$300</span>
                {/* <span
                  className="text-gray-500 dark:text-gray-400"
                >
                  /month
                </span> */}
              </div>

              <ul role="list" className="mb-8 space-y-4 text-center">
                <li className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5 raffles</span>
                </li>
                <button onClick={() => handleAddItem('standard', '5 raffles', 500, 5)} className='mr-3 mt-3 rounded-full border-2 border-solid border-redc py-2 px-5 text-justify text-sm leading-6 text-redc'>Add to cart</button>
              </ul>
            </div>

            <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              {/* <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
                Best for large scale uses and extended redistribution rights.
              </p> */}
              <div className="my-8 flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">$550</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>

              <ul role="list" className="mb-8 space-y-4 text-center">
                <li className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>10 raffles</span>
                </li>
                <button onClick={() => handleAddItem('premium', '10 raffles', 1000, 10)} className='mr-3 mt-3 rounded-full border-2 border-solid border-redc py-2 px-5 text-justify text-sm leading-6 text-redc'>Add to cart</button>
              </ul>
            </div>
          </div>
          <div className = 'text-center pt-10'>
                <p>Not sure what to choose, or you want a custom made package for your business?</p>
                <p>Contact us and tell us more!</p>
                <button className='mr-3 mt-3 rounded-full border-2 border-solid border-redc py-2 px-7 text-justify text-lg leading-6 text-redc'>Email us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
