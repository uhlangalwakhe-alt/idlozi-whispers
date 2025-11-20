/**
 * Netlify Function scaffold for Stripe Checkout.
 * - Add your Stripe secret key to Netlify environment variables as STRIPE_SECRET_KEY
 * - This function expects a POST and returns { url } of checkout session.
 * - For local testing use netlify dev and set env vars.
 */
const stripeLib = require('stripe');
const secret = process.env.STRIPE_SECRET_KEY || '';

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (!secret) return { statusCode: 500, body: 'Stripe key missing. Set STRIPE_SECRET_KEY in Netlify env.' };
  const stripe = stripeLib(secret);
  try {
    const body = JSON.parse(event.body || '{}');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'iDlozi Reading' }, unit_amount: (body.amount || 1000) }, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.URL || 'https://example.com'}/?success=true`,
      cancel_url: `${process.env.URL || 'https://example.com'}/?canceled=true`,
    });
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.log('Stripe error', err);
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};