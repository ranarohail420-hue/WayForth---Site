(()=>{
  const overlay=document.querySelector('.wf-aux-overlay');if(!overlay)return;
  const heading=overlay.querySelector('[data-aux-title]');
  const description=overlay.querySelector('[data-aux-description]');
  function close(){overlay.classList.remove('open')}
  const auxCopy={
    contact:{title:'Contact Us',description:'Need construction, trucking or media support? Start an inquiry and the WAYFORTH team can follow up.'},
    about:{title:'About WAYFORTH',description:'WAYFORTH brings together construction, freight and trucking, and digital media under one brand focused on dependable execution and lasting partnerships.'},
    support:{title:'Support',description:'Need help with an inquiry, ongoing project, trucking request or media service? Contact WAYFORTH and our team can guide you to the right next step.'}
  };
  document.querySelectorAll('[data-aux]').forEach(button=>button.addEventListener('click',()=>{
    const copy=auxCopy[button.dataset.aux]||auxCopy.contact;
    heading.textContent=copy.title;
    description.textContent=copy.description;
    overlay.classList.add('open');
  }));
  overlay.querySelector('[data-aux-close]').addEventListener('click',close);
  overlay.querySelector('[data-aux-quote]').addEventListener('click',()=>{
    close(); const btn=document.querySelector('[data-open="quote"]');if(btn)btn.click();
  });
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
