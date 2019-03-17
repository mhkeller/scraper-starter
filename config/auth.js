module.exports = {
	username: process.env.SCRAPER_USERNAME || '',
	password: process.env.SCRAPER_PASSWORD || '',
	inputUsernameSelector: 'input[name="email"]',
	inputPasswordSelector: 'input[name="pass"]',
	loginButtonSelector: '#loginbutton',
	cookiesPath: 'config/cookies.json'
};
