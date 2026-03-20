// STRIPE PAYMENT
const stripe = Stripe('pqzptqtp6pu7r');

async function payStripe() {
  const res = await fetch('/stripe-pay', { method: 'POST' });
  const data = await res.json();
  stripe.redirectToCheckout({ sessionId: data.id });
}

// PAYFAST PAYMENT
async function payPayfast() {
  const res = await fetch('/payfast', { 
    method:'POST', 
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ amount: 500.00 })
  });
  const data = await res.json();
  window.location.href = data.url; // redirect to Payfast
}

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const inputs = e.target.elements;
  await fetch('/contact', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name: inputs[0].value,
      email: inputs[1].value,
      message: inputs[2].value
    })
  });
  alert("Message sent!");
});
