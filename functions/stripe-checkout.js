// sample Netlify Function (node) to create Stripe Checkout session
// Requires environment variable STRIPE_SECRET_KEY and @stripe/stripe-node installed
// Deploy to Netlify functions folder and replace DOMAIN with your site URL.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{price_data:{currency:'zar',product_data:{name: body.item_name},unit_amount: Math.round(body.amount * 100)},quantity:1}],
    mode: 'payment',
    success_url: body.success_url || 'https://YOUR_SITE_URL/.netlify/functions/success',
    cancel_url: body.cancel_url || 'https://YOUR_SITE_URL/bookings.html'
  });
  return { statusCode: 200, body: JSON.stringify({ id: session.id }) };
};
