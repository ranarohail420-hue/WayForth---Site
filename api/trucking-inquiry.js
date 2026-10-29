/* WAYFORTH V31 — validated, size-limited, same-origin lead email endpoint (Resend). Env vars unchanged. */
const SERVICES = {car: 'Ship a Car', boat: 'Ship a Boat', freight: 'Move a Load', carrier: 'Join as a Carrier'};
const PRIORITY = ['fullName', 'email', 'phone', 'company'];
const MAX_FIELDS = 40, MAX_VALUE = 1500;

function clean(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
}
function oneLine(value, max) {
  return String(value ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}
function pretty(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
function isEmail(value) {
  return /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(value) && value.length <= 254;
}
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return host === req.headers.host || host === req.headers['x-forwarded-host'];
  } catch (_) {
    return false;
  }
}
function parseBody(req) {
  const raw = req.body;
  if (typeof raw === 'string') return JSON.parse(raw || '{}');
  return raw && typeof raw === 'object' ? raw : {};
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({message: 'Method not allowed.'});
  if (!sameOrigin(req)) return res.status(403).json({message: 'Request blocked.'});

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAYFORTH_FROM_EMAIL;
  const recipients = (process.env.WAYFORTH_LEADS_EMAIL || 'info@wayforth.ltd').split(',').map(s => s.trim()).filter(Boolean);
  if (!apiKey || !from) return res.status(503).json({message: 'WAYFORTH email delivery is not configured yet. Please contact the team directly.'});

  let body;
  try {
    body = parseBody(req);
  } catch (_) {
    return res.status(400).json({message: 'Your request could not be read. Please try again.'});
  }

  const rawDetails = body.details && typeof body.details === 'object' && !Array.isArray(body.details) ? body.details : {};
  const details = {};
  for (const [key, value] of Object.entries(rawDetails).slice(0, MAX_FIELDS)) {
    if (!/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(key)) continue;
    if (value && typeof value === 'object') continue;
    const text = String(value ?? '').replace(/\r/g, '').trim().slice(0, MAX_VALUE);
    if (text) details[key] = text;
  }

  const email = oneLine(details.email, 254);
  const phoneDigits = String(details.phone || '').replace(/\D/g, '');
  if (!oneLine(details.fullName, 120) || !isEmail(email) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return res.status(400).json({message: 'Please check your name, email and phone number and try again.'});
  }

  const label = SERVICES[body.service] || oneLine(body.serviceLabel, 60) || 'Trucking Inquiry';
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
        reply_to: email,
        html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#172033"><h2>New ${clean(label)}</h2><p>A customer submitted a request through the WAYFORTH Trucking website.</p><table style="width:100%;border-collapse:collapse">${rows}</table><p style="margin-top:20px;color:#65758b;font-size:12px">Source: ${clean(oneLine(body.source || 'WAYFORTH Website', 80))}<br>Received: ${clean(received)}</p></div>`
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Email provider rejected the request.');
    return res.status(200).json({ok: true, id: data.id || null});
  } catch (error) {
    console.error('WAYFORTH trucking inquiry:', error);
    return res.status(500).json({message: 'We could not send your request right now. Please try again or contact WAYFORTH directly.'});
  } finally {
    clearTimeout(timer);
  }
};
