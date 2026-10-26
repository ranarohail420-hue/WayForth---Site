function clean(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
module.exports=async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({message:'Method not allowed.'});
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.WAYFORTH_FROM_EMAIL;
  const recipients=(process.env.WAYFORTH_LEADS_EMAIL||'info@wayforth.ltd').split(',').map(s=>s.trim()).filter(Boolean);
  if(!apiKey||!from)return res.status(503).json({message:'WAYFORTH email delivery is not configured yet. Please contact the team directly.'});
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
    const label=clean(body.serviceLabel||body.service||'Trucking Inquiry');
    const details=body.details&&typeof body.details==='object'?body.details:{};
    const rows=Object.entries(details).filter(([,v])=>String(v??'').trim()!=='').map(([k,v])=>`<tr><td style="padding:8px 12px;border-bottom:1px solid #e8edf3;font-weight:700;text-transform:capitalize">${clean(k.replace(/([A-Z])/g,' $1'))}</td><td style="padding:8px 12px;border-bottom:1px solid #e8edf3">${clean(v)}</td></tr>`).join('');
    const reply=String(details.email||'').trim();
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:recipients,subject:`WAYFORTH Website — ${label}`,reply_to:reply||undefined,html:`<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#172033"><h2>New ${label}</h2><p>A customer submitted a request through the WAYFORTH Trucking website.</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="margin-top:20px;color:#65758b;font-size:12px">Source: ${clean(body.source||'WAYFORTH Website')}</p></div>`})});
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.message||'Email provider rejected the request.');
    return res.status(200).json({ok:true,id:data.id||null});
  }catch(error){console.error('WAYFORTH trucking inquiry:',error);return res.status(500).json({message:'We could not send your request right now. Please try again or contact WAYFORTH directly.'})}
}
