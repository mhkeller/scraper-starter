/* --------------------------------------------
 *
 * Try various authentication credentials to get to a target page
 *
 * --------------------------------------------
 */
import { existsSync, readFileSync } from 'fs';
import { readDataSync, writeDataSync } from 'indian-ocean';
import notify from '@mhkeller/notify';
import { wait } from '@mhkeller/utils/scrape';

import {
	username,
	password,
	cookiesPath,
	inputUsernameSelector,
	inputPasswordSelector,
	loginButtonSelector
} from '../config/config.js';

/* --------------------------------------------
	* Test to see if we have been kicked to the login page
	*/
function success (page) {
	return !page.url().includes('/login');
}

export default async function authenticate (browser, page, targetUrl) {
	const waitFor = wait(page);

	const browserContext = await browser.newContext();

	/* --------------------------------------------
	 * Navigate to the target page
	 */
	await page.goto(targetUrl, { waitUntil: 'load' });

	/* --------------------------------------------
	 * If we have cookies, set them and visit the page
	 * return successful if we're no longer on the login page
	 */
	if (existsSync(cookiesPath)) {
		notify({ m: 'Found cookies...', d: 'header' });
		const cookies = readDataSync(cookiesPath);
		await browserContext.addCookies(cookies);
	}

	await page.goto(targetUrl, { waitUntil: 'load' });

	notify({ m: 'Navigating to target...', d: 'header' });
	await waitFor(2_000);;
	if (success(page)) {
		return;
	}

	notify({ m: '\tLogin required...', d: 'note' });
	/* --------------------------------------------
	 * Look for the login fields and type our credentials
	 */
	await page.locator(inputUsernameSelector);

	const usernameInput = await page.locator(inputUsernameSelector);
	const passwordInput = await page.locator(inputPasswordSelector);

	await usernameInput.type(username, { delay: 100 });
	await passwordInput.type(password, { delay: 100 });

	const logInButton = await page.locator(loginButtonSelector);

	await logInButton.click();
	await waitFor(5_000);

	await page.goto(targetUrl, { waitUntil: 'load' });

	/* --------------------------------------------
	 * Write out our cookies so we don't have to type credentials next time
	 */
	const cookies = await browserContext.cookies();
	if (cookies.length) {
		writeDataSync(cookiesPath, cookies);
		notify({ m: '\tSaved cookies...', v: cookiesPath, d: ['green', 'bold'] });
	} else {
		notify({ m: '\tNo cookies found...', v: cookiesPath, d: 'warn' });
	}
}
