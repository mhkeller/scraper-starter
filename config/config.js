import dotenv from 'dotenv';

/**
 * Config
 */
dotenv.config();

/**
 * This page should be behind authentication
 */
export const targetUrl = 'https://my-site.com';

/**
 * Credentials
 */
export const username = process.env.SCRAPER_USERNAME;
export const password = process.env.SCRAPER_PASSWORD;

/**
 * Selectors for login form
 */
export const inputUsernameSelector = 'input[name="email"]';
export const inputPasswordSelector = 'input[name="pass"]';
export const loginButtonSelector = '#loginbutton';

/**
 * Where to save cookies
 */
export const cookiesPath = 'config/cookies.json';

