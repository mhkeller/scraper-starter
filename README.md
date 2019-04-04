Scraper starter
===

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

## Other config

This can be cleaned up but I put the target url [here](https://github.com/mhkeller/scraper-starter/blob/master/index.js#L14) but the rest of the configuration for typing in passwords is in [`config/auth.js`](https://github.com/mhkeller/scraper-starter/blob/master/config/auth.js). 

Anything below [line 17](https://github.com/mhkeller/scraper-starter/blob/c09ca63ba5ac5e6127b2fff513b650eb45e4612b/index.js#L17) can be customized for your scraper.

## Run the scraper

```
node index.js
```
