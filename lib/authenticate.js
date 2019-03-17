/* --------------------------------------------
 *
 * Try various authentication credentials to get to a target page
 *
 * --------------------------------------------
 */
const fs = require('fs');

module.exports = authenticate;

async function authenticate (page, targetUrl, {
	username,
	password,
	cookiesPath,
	inputUsernameSelector,
	inputPasswordSelector,
	loginButtonSelector
}) {
	/* --------------------------------------------
	 * Navigate to the target page
	 */
	await page.goto(targetUrl, { waitUntil: 'load' });

	/* --------------------------------------------
	 * If we have cookies, set them and visit the page
	 * return successful if we're no longer on the login page
	 */
	if (fs.existsSync(cookiesPath)) {
		const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
		await page.setCookie(...cookies);
		await page.goto(targetUrl, { waitUntil: 'load' });

		if (success()) {
			return;
		}
	} else {
		await page.goto(targetUrl, { waitUntil: 'load' });
		if (success()) {
			return;
		}
	}

	/* --------------------------------------------
	 * Look for the login fields and type our credentials
	 */
	await page.waitForSelector(inputUsernameSelector);

	const usernameInput = await page.$(inputUsernameSelector);
	const passwordInput = await page.$(inputPasswordSelector);

	await usernameInput.type(username, { delay: 100 });
	await passwordInput.type(password, { delay: 100 });

	const logInButton = await page.$(loginButtonSelector);

	await logInButton.click();
	await page.waitFor(2000);

	/* --------------------------------------------
	 * Write out our cookies so we don't have to type credentials next time
	 */
	const cookies = await page.cookies();
	fs.writeFileSync(cookiesPath, JSON.stringify(cookies), 'utf-8');

	/* --------------------------------------------
	 * Shared function with page in a closure to check if we are at the target page
	 */
	function success () {
		return !page.url().includes('/login');
	}
}
