import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AdHome() {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      company_name: '',
      email: '',
      address: '',
      text: '',
      terms: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Numele nu trebuie sa depaseasca 20 de caractere')
        .required('Numele este obligatoriu'),
      company_name: Yup.string()
        .max(30, 'Numele companiei nu trebuie sa depaseasca 30 de caractere')
        .required('Numele companiei este obligatoriu'),
      email: Yup.string()
        .email('Adresa de email invalida')
        .required('Email-ul este obligatoriu'),
      address: Yup.string().required('Adresa companiei este obligatorie'),
      text: Yup.string()
        .min(50, 'Anuntul trebuie sa contina minim 50 de caractere')
        .required('Anuntul este obligatoriu'),
      terms: Yup.array().required(
        'Termenii si conditiile trebuiesc acceptate!',
      ),
    }),

    onSubmit: (values) => {
      setPrice(values.text.split(" ").length * 1.2)
      fetch('/api/create/ad', {
        method: 'POST',
        body: JSON.stringify({
          text: values.text,
          name: values.name,
          company_name: values.company_name,
          email: values.email,
          address: values.address,
          price: price,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          console.log(res);
          console.log('form submitted');
          console.log(values);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full"
    >
      <Head>
        <title>Formular anunt</title>
        <meta name="description" content="Formular anunt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex h-screen items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="font-latoRegular flex w-1/2 rounded-lg bg-white"
        >
          <div className="flex-col p-20 text-gray-700">
            <h1 className="font-latoBold pb-2 text-3xl">
              Adauga un anunt de mediu
            </h1>
            <p className="text-lg  text-gray-500"></p>
            <div className="mt-6 flex flex-col">
              {/* Name input field */}
              <div className="pb-4">
                <label
                  htmlFor="name"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.name && formik.errors.name
                      ? 'text-red-400'
                      : ''
                  } `}
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : 'Name'}
                </label>
                <p className="font-latoBold text-sm text-red-400 "></p>
                <input
                  className="w-full rounded-md border-2 border-gray-500 p-2 focus:border-teal-500 focus:ring-teal-500 "
                  type="text"
                  name="name"
                  placeholder="Introduceti numele complet"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Email input field */}
              <div className="pb-4">
                <label
                  htmlFor="email"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.email && formik.errors.email
                      ? 'text-red-400'
                      : ''
                  }`}
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : 'Email'}
                </label>

                <p></p>
                <input
                  className="w-full rounded-md border-2 border-gray-500 p-2 focus:border-teal-500 focus:ring-teal-500"
                  type="email"
                  name="email"
                  placeholder="Introduceti adresa de email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Company name field */}
              <div className="pb-4">
                <label
                  htmlFor="company_name"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.company_name && formik.errors.company_name
                      ? 'text-red-400'
                      : ''
                  } `}
                >
                  {formik.touched.company_name && formik.errors.company_name
                    ? formik.errors.company_name
                    : 'Company name'}
                </label>
                <p className="font-latoBold text-sm text-red-400 "></p>
                <input
                  className="w-full rounded-md border-2 border-gray-500 p-2 focus:border-teal-500 focus:ring-teal-500 "
                  type="text"
                  name="company_name"
                  placeholder="Introduceti numele companiei"
                  onChange={formik.handleChange}
                  value={formik.values.company_name}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="pb-4">
                <label
                  htmlFor="address"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.address && formik.errors.address
                      ? 'text-red-400'
                      : ''
                  } `}
                >
                  {formik.touched.address && formik.errors.address
                    ? formik.errors.name
                    : 'Adresa'}
                </label>
                <p className="font-latoBold text-sm text-red-400 "></p>
                <input
                  className="w-full rounded-md border-2 border-gray-500 p-2 focus:border-teal-500 focus:ring-teal-500 "
                  type="text"
                  name="address"
                  placeholder="Introduceti adresa"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Advertisment text */}
              <div className="pb-4">
                <label
                  htmlFor="text"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.text && formik.errors.text
                      ? 'text-red-400'
                      : ''
                  } `}
                >
                  {formik.touched.text && formik.errors.text
                    ? formik.errors.text
                    : 'Anunt'}
                </label>
                <p className="font-latoBold text-sm text-red-400 "></p>
                <textarea
                  className="w-full rounded-md border-2 border-gray-500 p-2 focus:border-teal-500 focus:ring-teal-500 "
                  name="text"
                  placeholder="Introduceti textul anuntului aici"
                  onChange={formik.handleChange}
                  value={formik.values.text}
                  onBlur={formik.handleBlur}
                />
              </div>
              {/* Country input field */}
              {/* <div className="pb-4">
                  <label
                    htmlFor="country"
                    className="block font-latoBold text-sm pb-2"
                  >
                    Country
                  </label>
                  <select
                    className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                    name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </select>
                </div> */}
              {/* Terms of service*/}
              <div className="pb-4">
                <label
                  htmlFor="terms"
                  className={`font-latoBold block pb-2 text-sm ${
                    formik.touched.terms && formik.errors.terms
                      ? 'text-red-400'
                      : ''
                  }`}
                >
                  {formik.touched.terms && formik.errors.terms
                    ? formik.errors.terms
                    : 'Termeni si conditii'}
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="background-gray-500 h-5 w-5 border-2  text-teal-500 focus:border-teal-500 focus:ring-teal-500"
                  />
                  <p className="font-latoBold text-sm text-gray-500">
                    Acceptarea termenilor si conditiilor.
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <button
                  type="button"
                  className="font-latoBold mt-6 w-full rounded-lg bg-teal-500 py-3 text-sm text-white"
                  onClick={() => {
                    setPrice(formik.values.text.split(" ").length * 1.2)
                    setIsCalculated(true);
                  }}
                >
                  Calculeaza pretul
                </button>
                {
                    isCalculated ? (
                        <p className='font-bold text-teal-700 text-lg transition'>{price} lei</p>
                    ) : (
                        <p></p>
                    )
                }
                
              </div>
              <button
                  type="submit"
                  className="font-latoBold mt-6 w-full rounded-lg bg-teal-500 py-3 text-sm text-white"
                >
                  Trimite anuntul
                </button>
            </div>
          </div>
        </form>
      </main>
    </m.div>
  );
}
