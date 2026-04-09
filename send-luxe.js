const { Resend } = require('resend');
const fs = require('fs');

const resend = new Resend(process.env.RESEND_API_KEY);

async function send() {
  const html = fs.readFileSync('/Users/mac/leadcatch-app/preview-luxe-outreach.html', 'utf8');
  
  const result1 = await resend.emails.send({
    from: 'Asherton Chraibi <hello@userecapture.com>',
    to: 'luxedental@gmail.com',
    subject: 'Quick idea for Luxe Dental — from your neighbor',
    html: html,
  });
  console.log('Uptown:', result1.error ? result1.error : 'Sent! ID: ' + result1.data.id);

  const result2 = await resend.emails.send({
    from: 'Asherton Chraibi <hello@userecapture.com>',
    to: 'luxedentalvp@gmail.com',
    subject: 'Quick idea for Luxe Dental — from your neighbor',
    html: html,
  });
  console.log('Victory Park:', result2.error ? result2.error : 'Sent! ID: ' + result2.data.id);
}

send();
