Scraper starter
===

> Playwright starter template. Logs in using provided credentials and saves cookies for later runs.

## Install deps

```
npm install
```

## Add auth config

```
touch .env
```

In that file, add these two credential fields

```txt
SCRAPER_USERNAME=username@domain.com
SCRAPER_PASSWORD=my-secret-password
```

## Run the scraper

```
node index.js
```
