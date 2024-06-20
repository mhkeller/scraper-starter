import { chromium } from 'playwright';

/**
 * Uncomment to use stealth plugin
 */
// import stealth from 'puppeteer-extra-plugin-stealth';
// chromium.use(stealth());

export default async function launchBrowser ({ headless = true, viewport = { width: 1080, height: 875 } } = {}) {
	const browser = await chromium.launch({ headless });
	const browserContext = await browser.newContext();
	const page = await browserContext.newPage({ viewport });
	return { browser, browserContext, page };
}
