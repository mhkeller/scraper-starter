/* --------------------------------------------
 *
 * Try various authentication credentials to get to a target page
 *
 * --------------------------------------------
 */
import { existsSync, readFileSync } from 'fs';
import { writeDataSync } from 'indian-ocean';
import notify from '@mhkeller/notify';

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

export default async function authenticate (page, targetUrl) {
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
		const cookies = JSON.parse(readFileSync(cookiesPath, 'utf-8'));
		await page.setCookie(...cookies);
		await page.goto(targetUrl, { waitUntil: 'load' });
		notify({ m: 'Navigating to target...', d: 'header' });
		if (success(page)) {
			return;
		}
	} else {
		await page.goto(targetUrl, { waitUntil: 'load' });
		notify({ m: 'Navigating to target...', d: 'header' });
		if (success(page)) {
			return;
		}
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

	const logInButton = await page.$(loginButtonSelector);

	await logInButton.click();
	await page.waitForTimeout(2_000);

	/* --------------------------------------------
	 * Write out our cookies so we don't have to type credentials next time
	 */
	const cookies = await page.cookies();
	writeDataSync(cookiesPath, cookies);
	notify({ m: 'Saved cookies...', v: cookiesPath, d: ['green', 'bold'] });
}
