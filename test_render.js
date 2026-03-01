const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    await page.goto('file://' + path.resolve('ScoreShield.html'), { waitUntil: 'networkidle' });
    
    const bodyHTML = await page.innerHTML('body');
    console.log('BODY LENGTH:', bodyHTML.length);
    if (bodyHTML.length < 500) {
        console.log("BODY HTML:", bodyHTML);
    }
    await browser.close();
})();
