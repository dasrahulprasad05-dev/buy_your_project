const puppeteer = require('puppeteer');
const { exec } = require('child_process');

async function run() {
  const server = exec('npm run preview', { cwd: __dirname });
  
  let url = 'http://localhost:4173';
  console.log('Waiting for server...');
  await new Promise(r => setTimeout(r, 4000));
  console.log('Navigating to', url);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    } else {
      console.log('BROWSER LOG:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (e) {
    console.log('Timeout or error navigating:', e);
  }
  
  await browser.close();
  server.kill();
  process.exit(0);
}

run();
