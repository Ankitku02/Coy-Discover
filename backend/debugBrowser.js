const puppeteer = require('puppeteer-core');

async function debugApp() {
  console.log('🚀 Launching Edge browser headless to debug swipe...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  page.on('console', (msg) => console.log('🌐 BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('❌ PAGE RUNTIME ERROR:', err.message));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('h2', { timeout: 10000 });

  const getCandidateName = async () => {
    return page.evaluate(() => {
      const h2 = document.querySelector('h2');
      return h2 ? h2.innerText : null;
    });
  };

  const initialName = await getCandidateName();
  console.log('Initial Card Name:', initialName);

  // Click Like button
  console.log('Attempting to click Like button...');
  const likeBtn = await page.$('button[aria-label="Like profile"]');
  if (likeBtn) {
    await likeBtn.click();
    console.log('Clicked Like button! Waiting 800ms...');
    await new Promise((r) => setTimeout(r, 800));
    const afterClickName = await getCandidateName();
    console.log('Card Name after Like click:', afterClickName);
    if (initialName !== afterClickName) {
      console.log('✅ Button Like Swiped successfully!');
    } else {
      console.log('❌ Card did NOT change after Like button click!');
    }
  }

  // Keyboard Right Arrow test
  console.log('Testing Keyboard Right Arrow swipe...');
  const beforeKeyName = await getCandidateName();
  await page.keyboard.press('ArrowRight');
  await new Promise((r) => setTimeout(r, 800));
  const afterKeyName = await getCandidateName();
  console.log('Card Name after ArrowRight:', afterKeyName);
  if (beforeKeyName !== afterKeyName) {
    console.log('✅ Keyboard Arrow swipe worked!');
  }

  // Mouse Drag test
  console.log('Testing mouse drag swipe on current card...');
  const currentCard = await page.$('div.cursor-grab');
  if (currentCard) {
    const box = await currentCard.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 150, startY, { steps: 5 });
    await page.mouse.up();

    await new Promise((r) => setTimeout(r, 800));
    const afterDragName = await getCandidateName();
    console.log('Card Name after drag:', afterDragName);
    if (afterKeyName !== afterDragName) {
      console.log('✅ Mouse Drag Swipe worked!');
    }
  }

  await browser.close();
  console.log('🎉 Done debugging.');
}

debugApp().catch(console.error);
