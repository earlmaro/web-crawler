## Introduction

A web crawler, sometimes called a spider-bot and often shortened to crawler, is a bot that systematically browses the internet, typically for the purpose of Web indexing. These internet bots can be used by search engines to improve the quality of search results for users. Asides indexing the world wide web, crawling can also be used to gather data and this is known as web scraping.

This project contains code for a web crawler that scrapes a website and stores the data in a database. This crawler bot performs both operations using Node workers.

## Installation
1. Install dependencies - npm install
2. Run the coomand to start crawling from root directory - node src/command.js --url https://google.com -n 3

This project was built with the following:

- Node: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Axios: A promised based HTTP client for the browser and Node.js.
- Cheerio: A lightweight implementation of jQuery which gives us access to the DOM on the server.
- A pooling library called piscina, To manage the worker threads.