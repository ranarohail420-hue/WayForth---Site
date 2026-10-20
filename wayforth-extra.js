(()=>{
  const overlay=document.querySelector('.wf-aux-overlay');if(!overlay)return;
  const heading=overlay.querySelector('[data-aux-title]');
  const description=overlay.querySelector('[data-aux-description]');
  function close(){overlay.classList.remove('open')}
  document.querySelectorAll('[data-aux]').forEach(button=>button.addEventListener('click',()=>{
    const about=button.dataset.aux==='about';
    heading.textContent=about?'About WAYFORTH':'Contact WAYFORTH';
    description.textContent=about
      ? 'WAYFORTH brings together construction materials in Lahore, freight and trucking operations, and Digital Media. We focus on dependable service, clear communication and lasting partnerships.'
      : 'Need construction materials, trucking support or digital media services? Start an inquiry and our team can follow up. Contact numbers will be verified before public launch.';
    overlay.classList.add('open');
  }));
  overlay.querySelector('[data-aux-close]').addEventListener('click',close);
  overlay.querySelector('[data-aux-quote]').addEventListener('click',()=>{
    close(); const btn=document.querySelector('[data-open="quote"]');if(btn)btn.click();
  });
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
