/* WAYFORTH lead email endpoint (Resend) — V53 hardened.
   Same-origin only, JSON only, size-limited, rate-limited, validated and HTML-escaped.
   Nothing is stored: each request is turned into one email and discarded.
   Env vars (Vercel → Settings → Environment Variables):
     RESEND_API_KEY, WAYFORTH_FROM_EMAIL, WAYFORTH_LEADS_EMAIL (comma separated)
     optional WAYFORTH_ALLOWED_HOSTS (comma separated, e.g. wayforth.ltd,www.wayforth.ltd)
   optional WAYFORTH_SUPPORT_EMAIL (reply-to on the customer confirmation; default Support@wayforth.ltd)
   optional WAYFORTH_AUTOREPLY=off to stop the customer confirmation email */
const SERVICES = {
  car: 'Ship a Car', boat: 'Ship a Boat', freight: 'Move a Load', carrier: 'Join as a Carrier',
  build: 'Build Materials Quote', media: 'Media Inquiry', support: 'Support', general: 'General Inquiry'
};
const PRIORITY = ['fullName', 'email', 'phone', 'company'];
const MAX_FIELDS = 40, MAX_VALUE = 1500, MAX_BODY = 24000;
const WINDOW_MS = 10 * 60 * 1000, MAX_PER_WINDOW = 10;
const hits = new Map(); // best-effort per-instance rate limit

function clean(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
}
function oneLine(value, max) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
}
function pretty(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
function isEmail(value) {
  return /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(value) && value.length <= 254;
}
function allowedHost(host, req) {
  if (!host) return false;
  const extra = (process.env.WAYFORTH_ALLOWED_HOSTS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  host = host.toLowerCase();
  return host === String(req.headers.host || '').toLowerCase() ||
    host === String(req.headers['x-forwarded-host'] || '').toLowerCase() || extra.includes(host);
}
function sameOrigin(req) {
  const src = req.headers.origin || req.headers.referer;
  if (!src) return false; // browsers always send Origin on POST; scripts without it are refused
  try { return allowedHost(new URL(src).host, req); } catch (_) { return false; }
}
function clientIp(req) {
  return String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}
function limited(ip) {
  const now = Date.now();
  for (const [k, v] of hits) if (now - v.t > WINDOW_MS) hits.delete(k);
  const h = hits.get(ip) || {t: now, n: 0};
  if (now - h.t > WINDOW_MS) { h.t = now; h.n = 0; }
  h.n++; hits.set(ip, h);
  return h.n > MAX_PER_WINDOW;
}
function parseBody(req) {
  const raw = req.body;
  if (typeof raw === 'string') { if (raw.length > MAX_BODY) throw Error('too large'); return JSON.parse(raw || '{}'); }
  if (raw && typeof raw === 'object') { if (JSON.stringify(raw).length > MAX_BODY) throw Error('too large'); return raw; }
  return {};
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({message: 'Method not allowed.'}); }
  if (!sameOrigin(req)) return res.status(403).json({message: 'Request blocked.'});
  if (!/^application\/json\b/i.test(String(req.headers['content-type'] || ''))) return res.status(415).json({message: 'Unsupported request.'});
  if (Number(req.headers['content-length'] || 0) > MAX_BODY) return res.status(413).json({message: 'Your message is too long.'});
  if (limited(clientIp(req))) return res.status(429).json({message: 'Too many requests. Please wait a few minutes or contact us on WhatsApp.'});

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAYFORTH_FROM_EMAIL;
  const recipients = (process.env.WAYFORTH_LEADS_EMAIL || 'Support@wayforth.ltd,Ahmad@wayforth.ltd,Rohail@wayforth.ltd').split(',').map(s => s.trim()).filter(Boolean);
  if (!apiKey || !from) return res.status(503).json({message: 'WAYFORTH email delivery is not configured yet. Please contact the team directly.'});

  let body;
  try { body = parseBody(req); } catch (_) { return res.status(400).json({message: 'Your request could not be read. Please try again.'}); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({message: 'Your request could not be read.'});

  const rawDetails = body.details && typeof body.details === 'object' && !Array.isArray(body.details) ? body.details : {};
  if (rawDetails.wf_hp) return res.status(200).json({ok: true}); // honeypot: silently drop bots
  const details = {};
  for (const [key, value] of Object.entries(rawDetails).slice(0, MAX_FIELDS)) {
    if (!/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(key) || key === 'wf_hp') continue;
    if (value && typeof value === 'object') continue;
    const text = String(value ?? '').replace(/\r/g, '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim().slice(0, MAX_VALUE);
    if (text) details[key] = text;
  }

  const service = Object.prototype.hasOwnProperty.call(SERVICES, body.service) ? body.service : 'general';
  const email = oneLine(details.email, 254);
  const phoneDigits = String(details.phone || '').replace(/\D/g, '');
  const emailOptional = service === 'support';
  if (!oneLine(details.fullName, 120) || (!isEmail(email) && !(emailOptional && !email)) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return res.status(400).json({message: 'Please check your name, email and phone number and try again.'});
  }

  const label = oneLine(body.serviceLabel, 60).replace(/[<>]/g, '') || SERVICES[service];
  const ordered = [...PRIORITY.filter(k => k in details), ...Object.keys(details).filter(k => !PRIORITY.includes(k))];
  const rows = ordered.map(k => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e8edf3;font-weight:700;text-transform:capitalize;vertical-align:top">${clean(pretty(k))}</td><td style="padding:8px 12px;border-bottom:1px solid #e8edf3">${clean(details[k]).replace(/\n/g, '<br>')}</td></tr>`).join('');
  const received = new Date().toUTCString();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        from,
        to: recipients,
        subject: `WAYFORTH Website — ${label} — ${oneLine(details.fullName, 60).replace(/[<>]/g, '')}`,
        ...(email ? {reply_to: email} : {}),
        html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#172033"><h2>New ${clean(label)}</h2><p>A customer submitted a request through the WAYFORTH website.</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="margin-top:20px;color:#65758b;font-size:12px">Source: ${clean(oneLine(body.source || 'WAYFORTH Website', 80))}<br>Received: ${clean(received)}</p></div>`
      })
    });
    if (!response.ok) throw new Error('Email provider error ' + response.status);
    const data = await response.json().catch(() => ({}));
    // Best-effort "we received your request" email to the customer. Fixed text only: nothing the
    // visitor typed is repeated, so this cannot be used to send spam content to other people.
    if (email && process.env.WAYFORTH_AUTOREPLY !== 'off') {
      const support = process.env.WAYFORTH_SUPPORT_EMAIL || 'Support@wayforth.ltd';
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        signal: controller.signal,
        headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          from, to: [email], reply_to: support,
          subject: `We received your request — WAYFORTH`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033"><h2 style="margin:0 0 12px">Thank you for contacting WAYFORTH</h2><p>We have received your ${clean(SERVICES[service]).toLowerCase()} request. A member of our team will get back to you shortly.</p><p>If you need anything in the meantime, simply reply to this email or write to <a href="mailto:${clean(support)}">${clean(support)}</a>.</p><p style="margin-top:24px">— The WAYFORTH team<br><span style="color:#65758b;font-size:12px">Build · Trucking · Media</span></p></div>`
        })
      }).catch(() => {});
    }
    return res.status(200).json({ok: true, id: data.id || null});
  } catch (error) {
    console.error('WAYFORTH inquiry failed:', error && error.message); // no customer data in logs
    return res.status(500).json({message: 'We could not send your request right now. Please try again or contact WAYFORTH on WhatsApp.'});
  } finally {
    clearTimeout(timer);
  }
};
