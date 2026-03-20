const express = require('express');
const app = express();
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const querystring = require('querystring');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// ----------- STRIPE -----------
const stripe = Stripe('pqzptqtp6pu7r');

app.post('/stripe-pay', async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:[{
      price_data:{
        currency:'usd',
        product_data:{ name:'Consultation Fee' },
        unit_amount:5000,
      },
      quantity:1
    }],
    mode:'payment',
    success_url:'https://ttthema-backend.onrender.com/success.html',
    cancel_url:'https://ttthema-backend.onrender.com/cancel.html',
  });
  res.json({id:session.id});
});

// ----------- PAYFAST ----------
const PAYFAST_MERCHANT_ID = 'YOUR_PAYFAST_MERCHANT_ID';
const PAYFAST_PASSKEY = 'YOUR_PAYFAST_PASSKEY';

app.post('/payfast', (req,res)=>{
  const { amount = 500.00, item_name = "Legal Consultation" } = req.body;

  const payload = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_PASSKEY,
    amount: amount.toFixed(2),
    item_name,
    return_url: 'https://ttthema-backend.onrender.com/success.html',
    cancel_url: 'https://ttthema-backend.onrender.com/cancel.html'
  };

  const payfastUrl = 'https://www.payfast.co.za/eng/process?' + querystring.stringify(payload);
  res.json({ url: payfastUrl });
});

// ----------- CONTACT FORM EMAIL ----------
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'karabononyane99@gmail.com',
    pass:'howi tbun ejvd wanz'
  }
});

app.post('/contact', async (req,res)=>{
  const { name,email,message } = req.body;
  await transporter.sendMail({
    from: email,
    to: 'YOUR_EMAIL@gmail.com',
    subject:'New Client Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  });
  res.sendStatus(200);
});

// ----------- START SERVER -----------
app.listen(3000, ()=>console.log("Server running on port 3000"));
