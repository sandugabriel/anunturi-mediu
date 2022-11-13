import { CartItem } from '@/types/models';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authSession = await getSession({ req });
  const { items }: { items: CartItem[] } = req.body;

  if (items.length === 0) {
    console.log('no items');
    res.status(500).json({ message: 'no items here' });
  }

  const transformedItems = items.map((item) => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      description: item.name,
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'payment',
      success_url: process.env.NEXT_PUBLIC_HOST + '/success?referrer=stripe',
      cancel_url: process.env.NEXT_PUBLIC_HOST + 'checkout',
      metadata: {
        customer: JSON.stringify({
          email: authSession.user.email,
          name: authSession.user.name,
        }),
        items: JSON.stringify(items),
      },
      billing_address_collection: 'required',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default handler;
