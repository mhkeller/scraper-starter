import { launchBrowser } from '@mhkeller/utils/scrape';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

import authenticate from './lib/authenticate.js';

import { targetUrl } from '../config/config.js';

chromium.use(stealth());

const { browser, page } = await launchBrowser({ headless: false });

await authenticate(page, targetUrl);

/* --------------------------------------------
	* Click into the audience input element, which will bring up the map
	*/
const locationInputSelector = 'div[data-testid="ads-targeting-location-typeahead"]';
await page.waitFor(locationInputSelector);
await page.click(locationInputSelector);

// const mySelector = '.tk';
// await page.waitForSelector(mySelector);

// // Extract the results from the page.
// const texts = await page.evaluate(sel => {
// 	const things = Array.from(document.querySelectorAll(sel));
// 	return things.map(thing => {
// 		const text = thing.textContent.trim();
// 		return text;
// 	});
// }, mySelector);

// console.log(texts);

await browser.close();
