import authenticate from './lib/authenticate.js';
import launchBrowser from './lib/launchBrowser.js';

import { targetUrl } from './config/config.js';

const { browserContext, page } = await launchBrowser({ headless: false });

/**
 * Skip this step if you don't need to hit a login page
 */
await authenticate(browserContext, page, targetUrl);

/* --------------------------------------------
 * Type a name into the discovery search bar
 */
const searchBar = await page.locator('input[name="search"]');

await searchBar.type('testing', { delay: 100 });

/**
 * Uncomment this in production but leave it
 * commented out for development so you can
 * inspect the page
 */
// await browser.close();
