const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function debugVercel() {
  try {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const url = 'https://buy-your-project.vercel.app';
    console.log('Fetching', url);
    const htmlResponse = await fetch(url);
    const html = await htmlResponse.text();
    
    // Find script tags
    const scriptRegex = /<script type="module" crossorigin src="([^"]+)"><\/script>/g;
    let match;
    const scripts = [];
    while ((match = scriptRegex.exec(html)) !== null) {
      scripts.push(match[1]);
    }
    
    console.log('Found scripts:', scripts);
    
    // Setup JSDOM
    const dom = new JSDOM(html, {
      url: url,
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true
    });
    
    // Catch errors
    dom.window.console.error = (...args) => {
      console.log("JSDOM CONSOLE ERROR:", ...args);
    };
    
    dom.window.addEventListener("error", (event) => {
      console.log("JSDOM ERROR:", event.message, event.error);
    });
    
    dom.window.addEventListener("unhandledrejection", (event) => {
      console.log("JSDOM PROMISE REJECTION:", event.reason);
    });
    
    // Wait a bit
    await new Promise(r => setTimeout(r, 5000));
    console.log('Done waiting. JSDOM title:', dom.window.document.title);
    console.log('JSDOM root HTML:', dom.window.document.getElementById('root')?.innerHTML || dom.window.document.body.innerHTML);
    
  } catch(e) {
    console.log('Script error:', e);
  }
}

debugVercel();
