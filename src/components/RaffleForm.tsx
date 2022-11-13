import Unauthorized from '@/components/Unauthorized';
import { Field, FieldArray, Form, Formik, validateYupSchema } from 'formik';
import { useUpdate } from 'MyContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Navbar from './Navbar';

type base64 = {
  csv: string;
  kv: string;
  prize_photos: string[];
};

const RaffleForm = () => {
  const updateCont = useUpdate();
  const { data: session, status } = useSession();
  const [afterPhotoUpload, setAfterPhotoUpload] = useState(false);
  const [csvRows, setCsvRows] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [photoInputs, setPhotoInputs] = useState([]);
  const [prizeNumbers, setPrizeNumbers] = useState([]);
  const [base64Files, setBase64Files] = useState({} as base64);
  const [draft, setDraft] = useState(false);
  const [raffleName, setRaffleName] = useState('');
  const [raffleInfo, setRaffleInfo] = useState('');
  const [rafflePrizeNames, setRafflePrizeNames] = useState([]);
  const [rafflePrizeNumbers, setRafflePrizeNumbers] = useState([]);

  const readCSV = async (file) => {
    const response = await fetch(file.toString());
    const reader = response.body.getReader();
    // const reader = file.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    const results = Papa.parse(csv, { header: true });
    const rows = results.data;
    rows.forEach((row: any) => {
      if (typeof row['Nume'] !== 'undefined') {
        const re = /./g;
        row['Nume'] =
          row['Nume'].slice(0, 1) + row['Nume'].slice(1).replace(re, '*');
        row['Prenume'] =
          row['Prenume'].slice(0, 1) + row['Prenume'].slice(1).replace(re, '*');
        let email_split = row['email'].split('@');
        row['email'] =
          email_split[0].slice(0, 1) +
          email_split[0].slice(1).replace(re, '*') +
          '@' +
          email_split[1];
      }
    });
    // console.log(rows);
    return rows;
  };

  const generateMemoHeader = (headers): any => {
    let lst = [];
    console.log(headers);
    headers.forEach((header: string) => {
      lst.push({
        Header: header,
        accessor: header,
      });
    });
    console.log(lst);
    return lst;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const RaffleSchema = Yup.object().shape({
    csv: Yup.mixed().required('Csv is required'),
    name: Yup.string().required('Campaign name is required'),
    info: Yup.string().required('Campaign description is required'),
    prize_photos: Yup.mixed().required('Prize photos are required'),
    kv: Yup.mixed().required('KV is required'),
    terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  useEffect(() => {
    if (draft === true) {
      fetch('/api/create/raffle', {
        method: 'POST',
        body: JSON.stringify({
          name: raffleName,
          description: raffleInfo,
          draft: true,
          email: session.user.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        const result = await res.json();
        // console.log(result.message.id);
        let raffleid = result.message.id;

        fetch('/api/upload/csv', {
          method: 'POST',
          body: JSON.stringify({
            csv: base64Files.csv,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (res) => {
          const result = await res.json();
          // Aici pot folosi prisma pentru csv
          fetch('/api/create/csv', {
            method: 'POST',
            body: JSON.stringify({
              raffleId: raffleid,
              url: result.message.secure_url,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (res) => {
            const result = await res.json();
            // console.log(result.message);
          });
        });

        fetch('/api/upload/kv', {
          method: 'POST',
          body: JSON.stringify({
            kv: base64Files.kv,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async (res) => {
          const result = await res.json();
          fetch('/api/create/kv', {
            method: 'POST',
            body: JSON.stringify({
              raffleId: raffleid,
              url: result.message.url,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (res) => {
            const result = await res.json();
            // console.log(result.message);
          });
        });

        base64Files.prize_photos.forEach((prize_photo, index) => {
          fetch('/api/upload/prize', {
            method: 'POST',
            body: JSON.stringify({
              prize_photo: prize_photo,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (res) => {
            const result = await res.json();
            // console.log(result);
            fetch('/api/create/prize', {
              method: 'POST',
              body: JSON.stringify({
                raffleId: raffleid,
                url: result.message.url,
                name: rafflePrizeNames[index],
                number: rafflePrizeNumbers[index],
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(async (res) => {
              const result = await res.json();
              // console.log(result.message);
            });
          });
        });
      });
    }
  }, [draft]);

  if (status === 'unauthenticated') {
    return (
      <div>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mb-10 mt-5 flex flex-col items-center">
        <h1 className=" text-bold text-4xl leading-10">Form upload</h1>
      </div>

      <Formik
        initialValues={{
          csv: [] as any,
          columns: [] as any,
          fb_link: '',
          name: '',
          info: '',
          prize_photos: [],
          prize_numbers: [],
          prize_names: [],
          kv: '',
          ghost: false,
          record: false,
          terms: false,
          raffleId: '',
        }}
        validationSchema={RaffleSchema}
        onSubmit={(values) => {
          fetch('/api/create/raffle', {
            method: 'POST',
            body: JSON.stringify({
              name: values.name,
              description: values.info,
              draft: false,
              email: session.user.email,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (res) => {
            const result = await res.json();
            // console.log(result)
            values.raffleId = result.message.id;
            values.csv = csvRows;
            values.columns = csvColumns;
            updateCont(values);
          });
        }}
      >
        {(props) => (
          <Form>
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="flex w-2/3 flex-col items-center rounded-xl bg-grey-form p-5 md:mr-2 md:w-1/3">
                <h1 className="text-xl font-bold leading-6">
                  Upload your CSV (optional)
                </h1>
                <h2 className="mt-3 text-center text-base leading-6">
                  This is the list with your raffle participants. You can upload
                  it in ------ formats.
                </h2>

                <div className="mt-5 flex flex-col">
                  <h3 className="mt-1 text-base leading-6 text-drag-and-drop-text">
                    Upload files here
                  </h3>
                  <input
                    className={
                      'form-control ' +
                      (props.errors.terms && props.touched.terms
                        ? ' is-invalid'
                        : '')
                    }
                    type="file"
                    name="csv"
                    id="csv"
                    onChange={async (event) => {
                      // props.setFieldValue(
                      //   'csv',
                      //   URL.createObjectURL(event.currentTarget.files[0]),
                      // );
                      const file = event.currentTarget.files[0];
                      const rows = await readCSV(URL.createObjectURL(file));
                      const cols = generateMemoHeader(Object.keys(rows[0]));
                      setCsvRows(rows);
                      setCsvColumns(cols);
                      // props.setFieldValue('csv', rows);

                      const base64 = await toBase64(file);
                      let b64 = base64Files;
                      b64['csv'] = base64 as string;
                      setBase64Files(b64);
                    }}
                  />

                  <h2>{props.values.csv.name}</h2>
                </div>
              </div>
              <div className="mt-5 flex w-2/3 flex-col items-center rounded-xl bg-grey-form p-5 md:mt-0 md:ml-2 md:w-1/3">
                <h1 className="text-xl font-bold leading-6">
                  Insert Facebook Link (Coming soon)
                </h1>
                <h2 className="mt-3 text-center text-base leading-6">
                  If you did not upload a CSV with the participants, you can
                  extract them from a Facebook or Instagram post.
                </h2>
                <div className="mt-5 flex flex-col">
                  <input
                    disabled={true}
                    className="mt-1 border-solid bg-grey-form text-center text-base leading-6"
                    name="fb_link"
                    id="fb_link"
                    type="text"
                    placeholder="Insert link here"
                    onChange={props.handleChange}
                  />
                  <button
                    className="rounded-md bg-blue-500 px-3 py-1 text-white focus:outline-none disabled:opacity-50"
                    disabled
                  >
                    Get participants
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center md:mt-20 md:flex-row">
              <div className="flex w-1/3 flex-col items-center md:mr-2">
                <h1 className="text-xl font-bold leading-6">Campaign name</h1>
                <h2 className="mt-3 text-center text-base leading-6">
                  The campaign name you want to use
                </h2>
                <input
                  className="mt-2 w-52 rounded-md border-2 border-solid py-1 text-left text-base leading-6"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Campaign name goes here"
                  onChange={props.handleChange}
                />
              </div>
              <div className="mt-5 flex w-1/3 flex-col items-center md:mt-0 md:ml-2">
                <h1 className="text-xl font-bold leading-6">Campaign info</h1>
                <h2 className="mt-3 text-center text-base leading-6">
                  A short description or disclaimer for the campaign. Word
                  limit: 70
                </h2>
                <input
                  className="mt-2 rounded-md border-2 border-solid px-5 py-1 text-left text-base leading-6"
                  name="info"
                  id="info"
                  type="text"
                  placeholder="Campaign info"
                  onChange={props.handleChange}
                />
              </div>
            </div>

            {!afterPhotoUpload ? (
              <div className="mt-10 flex flex-col items-center">
                <div className="flex w-2/3 flex-col items-center rounded-xl bg-grey-form pt-10 pb-20">
                  <h1 className="text-xl font-bold leading-6">Prize photos</h1>
                  <h2 className="mt-3 text-center text-base leading-6">
                    You can upload up to 5 images for the prizes. Ideal size is
                    600x600 px. Name will be taken from filename
                  </h2>
                  <h2 className="mt-10 text-base text-drag-and-drop-text">
                    Upload files here
                  </h2>
                  <input
                    multiple
                    className="form-control"
                    type="file"
                    name="prize_photos"
                    onChange={(event) => {
                      let data = [];
                      let currData = [];
                      let currFields = [];
                      let currFieldsPart = [];
                      let b64Prizes = [];
                      Array.from(event.currentTarget.files).forEach(
                        async (file, i) => {
                          const base64 = await toBase64(file);
                          b64Prizes.push(base64);
                          data.push(URL.createObjectURL(file));

                          currData.push(
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={'photo' + i.toString()}
                              key={i.toString()}
                              width={60}
                              height={60}
                            />,
                          );
                          currFields.push(
                            <input
                              className="w-30 mt-2 rounded-md border-2 border-solid py-1 text-left text-sm leading-6"
                              name={`prize_names.${i}`}
                              id={`prize_names.${i}`}
                              type="text"
                              key={`prize_names.${i}`}
                              placeholder="Prize name"
                              onChange={props.handleChange}
                            />,
                          );
                          currFieldsPart.push(
                            <input
                              className="w-30 rounded-md border-2 border-solid py-1 text-left text-sm leading-6"
                              name={`prize_numbers.${i}`}
                              id={`prize_numbers.${i}`}
                              type="text"
                              key={`prize_numbers.${i}`}
                              placeholder="Number of prizes"
                              onChange={props.handleChange}
                            />,
                          );
                          props.setFieldValue('prize_photos', data);
                        },
                      );
                      let b64 = base64Files;
                      b64['prize_photos'] = b64Prizes;
                      setBase64Files(b64);
                      // console.log(base64Files);
                      setAfterPhotoUpload(true);
                      setPrizes(currData);
                      setPhotoInputs(currFields);
                      setPrizeNumbers(currFieldsPart);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-10 flex flex-col items-center">
                <div className="flex w-2/3 flex-col items-center rounded-xl bg-grey-form pt-10 pb-20">
                  <h1 className="text-xl font-bold leading-6">Prize photos</h1>
                  <h2 className="mt-3 text-center text-base leading-6">
                    You can upload up to 5 images for the prizes. Ideal size is
                    600x600 px.
                  </h2>
                  <div className="flex w-full justify-evenly pt-5">
                    {prizes}
                  </div>

                  <FieldArray
                    name="prize_names"
                    render={() => {
                      return (
                        <div className="flex w-full justify-evenly">
                          {photoInputs}
                        </div>
                      );
                    }}
                  />

                  <FieldArray
                    name="prize_numbers"
                    render={() => {
                      return (
                        <div className="flex w-full justify-evenly">
                          {prizeNumbers}
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col items-center">
              <div className="flex w-2/3 flex-col items-center rounded-xl bg-grey-form pt-10 pb-20">
                <h1 className="text-xl font-bold leading-6">
                  Campaign Key Visual
                </h1>
                <h2 className="mt-3 text-center text-base leading-6">
                  A banner image that will be displayed behind the raffle, in
                  the top of the page
                </h2>
                <h2 className="mt-10 text-base text-drag-and-drop-text">
                  Upload files here
                </h2>
                <input
                  className="form-control"
                  type="file"
                  name="kv"
                  onChange={async (event) => {
                    props.setFieldValue(
                      'kv',
                      URL.createObjectURL(event.currentTarget.files[0]),
                    );

                    const base64 = await toBase64(event.currentTarget.files[0]);
                    let b64 = base64Files;
                    b64['kv'] = base64 as string;
                    setBase64Files(b64);
                    // console.log(base64Files);
                  }}
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="flex w-11/12 md:w-2/3">
                <div className="form-check form-check-inline">
                  <input
                    onChange={props.handleChange}
                    className="form-check-input form-check-input float-left mt-1 mr-2 h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-checkbox checked:bg-checkbox focus:outline-none"
                    type="checkbox"
                    name="ghost"
                    id="ghost"
                  />
                  <div>
                    <label className="form-check-label inline-block text-xl font-bold leading-6">
                      Ghost winners
                    </label>
                    <h2 className="mt-3 text-left text-base leading-6">
                      5 more winners will be selected, but revealed only to you.
                      This can help if someone from the initial winners doesn’t
                      go through with the process.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="flex w-11/12 border-t-2 border-solid md:w-2/3"></div>
            </div>
            <div className="mt-10 mb-20 flex justify-center">
              <div className="flex w-11/12 justify-center md:w-2/3">
                <div className="form-check form-check-inline form-group">
                  <Field
                    type="checkbox"
                    name="terms"
                    className={
                      'form-check-input form-check-input float-left mt-1 mr-2 h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-checkbox checked:bg-checkbox focus:outline-none ' +
                      (props.errors.terms && props.touched.terms
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <label className="form-check-label inline-block pl-5 text-xl font-bold leading-6">
                    Terms and conditions
                  </label>

                  <div>
                    <h2 className="mt-3 text-left text-base leading-6">
                      I agree to the terms and conditions
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-20 flex justify-center">
              <button
                type="button"
                className="text-bold mr-5 rounded-full border-solid bg-save_draft_color px-10 py-5 text-2xl leading-6 text-white disabled:opacity-50"
                onClick={(event) => {
                  event.preventDefault();
                  setRaffleName(props.values.name);
                  setRaffleInfo(props.values.info);
                  setRafflePrizeNames(props.values.prize_names);
                  setRafflePrizeNumbers(props.values.prize_numbers);
                  setDraft(true);
                  alert('Draft saved successfully!');
                }}
              >
                Save as draft
              </button>
              <button
                className="text-bold mr-5 rounded-full border-solid bg-redc px-20 py-5 text-2xl leading-6 text-white"
                type="submit"
                onClick={() => {
                  // console.log(props.values);
                  if (props.errors) {
                    for (const [key, value] of Object.entries(props.errors)) {
                      toast(value.toString(), {
                        autoClose: 2000,
                      });
                    }
                  }
                }}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default RaffleForm;
