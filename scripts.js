
document.addEventListener('click', function(e){
  if(e.target.matches('[data-scroll]')){
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});
// Placeholder for form submit
function submitContact(e){
  e.preventDefault();
  alert('Thanks — demo form submit. Configure backend/Netlify forms or Stripe webhooks for production.');
}
