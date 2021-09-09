# Etherscan API

It forked from [etherscan-api 10.0.5](https://github.com/sebs/etherscan-api/tree/v10.0.5)<br>
The proxy URL and header have been added to avoid CORS.

## Development of a NEXTGEN Version has started - please stand by

[![npm](https://img.shields.io/npm/dt/etherscan-api.svg)](https://www.npmjs.com/package/etherscan-api)
[![license](https://img.shields.io/github/license/sebs/etherscan-api.svg)](https://github.com/sebs/etherscan-api/blob/master/LICENSE.md)
[![GitHub tag](https://img.shields.io/github/tag/sebs/etherscan-api.svg)](https://github.com/sebs/etherscan-api)
[![Travis](https://img.shields.io/travis/sebs/etherscan-api.svg)](https://travis-ci.org/sebs/etherscan-api)
[![GitHub issues](https://img.shields.io/github/issues/sebs/etherscan-api.svg)](https://github.com/sebs/etherscan-api/issues)

A way to access the [etherscan.io api](https://etherscan.io/apis) using promises. Fetch a diverse set of information about the blockchain.

Mainnet


```javascript
var api = require('etherscan-api-e').init('YourApiKey');
var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
balance.then(function(balanceData){
  console.log(balanceData);
});
```
## Example in the wild

* [Polymer3 based example](https://github.com/hiherto-elements/test-app)

## For testnet usage

Supported:

* morden
* ropsten
* rinkeby
* heco_mainnet
* heco_testnet
* bsc_mainnet
* bsc_testnet
* matic_mainnet
* matic_mumbai

Latest

```javascript
// apikey, network, timeout, proxyUrl, headers
var api = require('etherscan-api-e').init('YourApiKey','rinkeby'. '3000', 'https://cors-anywhere.herokuapp.com/', {
  'x-requested-with': 'me'
});
```


## Install

 ```bash
 npm install https://github.com/luckyCoco3418/etherscan-api.git
 ```


## API Documentation

[Full Api Docs](https://sebs.github.io/etherscan-api/)


## Development workflow

* npm test  - runs tests
  * npm run posttest - starts the linter
* npm run lint - preconfigured linter
* npm run docs - generates the apidocs
* npm run bundle - builds a new bundle
* npm run preversion - Steps before we create a new Tag
  * lint
  * changelog
* npm run pages - pushes generated apidocs to the server
* postversion - after generating a new version, push the tag to the server
* npm run changelog - generates a changelog and pushes it
