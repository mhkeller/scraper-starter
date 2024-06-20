import authenticate from './lib/authenticate.js';
import launchBrowser from './lib/launchBrowser.js';

import { targetUrl } from './config/config.js';

const { browserContext, page } = await launchBrowser({ headless: false });

await authenticate(browserContext, page, targetUrl);

/* --------------------------------------------
	* Type a name into the discovery search bar
	*/
const searchBar = await page.locator('input[name="search"]')

await searchBar.type('testing', { delay: 100 });
// await browser.close();
