import sendgrid, { MailDataRequired } from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  if (req.method === 'POST') {
    const values = req.body;
    const today = values.today.toString();
    const tomorrow = values.tomorrow.toString();
    const id = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    try {
      await sendgrid.send({
        to: 'piataseverineana@gmail.com', // Your email where you'll receive emails
        from: 'sandugabriel97@gmail.com', // your website email address here
        subject: 'Anunt de mediu nou!',
        html: `
      <h1>Anunt de mediu nou</h1>
      <p>Nume: ${values.name}</p>
      <p>Numele companiei: ${values.company_name}</p>
      <p>Adresa: ${values.address}</p>
      <p>Email: ${values.email}</p>
      <p>Text anunt: ${values.text}</p>
      <p>Pretul propus: ${values.price}</p>
      `,
      });
    } catch (error) {
      // console.log(error);
      return res.status(error.statusCode || 500).json({ error: error.message });
    }

    try {
      const template_data = {
        id: id,
        today: today,
        tomorrow: tomorrow,
        companyName: values.company_name,
        name: values.name,
        email: values.email,
        product: 'Anunt de mediu Online',
        price: values.price,
      };
      await sendgrid.send({
         // Your email where you'll receive emails
        from: 'sandugabriel97@gmail.com', // your website email address here
        subject: 'Anunt Piata Severineana',
        templateId: 'd-6b8e572ecb3a4287a810278403cfd848',
        
        to: values.email,
        dynamicTemplateData: template_data
        
        
      });
    } catch (error) {
      // console.log(error);
      return res.status(error.statusCode || 500).json({ error: error.message });
    }

    return res.status(200).json({ error: '' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
