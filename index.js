const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();
const authenticate = require('./lib/authenticate.js');
const authConfig = require('./config/auth.js');

main();

async function main () {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const targetUrl = `https://www.mysite-to-scrape.com`; // TODO, put this in some kind of config.

	await authenticate(page, targetUrl, authConfig);

	/* --------------------------------------------
	 * TEMPORARY Bypass the popup asking if you wanto continue an ad in progress
	 */
	await page.evaluate(() => {
		const buttons = Array.from(document.querySelectorAll('button[type="button"]'));
		buttons.forEach(btn => {
			if (btn.textContent === 'Continue') {
				btn.click();
			}
		});
	});

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

	// await browser.close();
}
