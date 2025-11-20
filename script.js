// small interactions: whatsapp FAB and accessibility helpers
(function(){
  const wa = document.getElementById('whatsapp-fab');
  if(wa){
    wa.addEventListener('click', ()=>{
      window.open('https://wa.me/27750803432','_blank');
    });
  }
})();