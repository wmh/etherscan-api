
const axios = require('axios');
/**
 * @param {string} chain
 * @returns {string}
 */
function pickChainUrl(chain) {
  if (!chain || !TESTNET_API_URL_MAP[chain]) {
    return MAIN_API_URL;
  }

  return TESTNET_API_URL_MAP[chain];
}


const MAIN_API_URL = 'https://api.etherscan.io';
const TESTNET_API_URL_MAP = {
  ropsten: 'https://api-ropsten.etherscan.io',
  kovan: 'https://api-kovan.etherscan.io',
  rinkeby: 'https://api-rinkeby.etherscan.io',
  homestead: 'https://api.etherscan.io',
  heco_mainnet: 'https://api.hecoinfo.com',
  heco_testnet: 'https://api-testnet.hecoinfo.com',
  bsc_mainnet: 'https://api.bscscan.com',
  bsc_testnet: 'https://api-testnet.bscscan.com',
  matic_mainnet: 'https://api.polygonscan.com',
  matic_mumbai: 'https://api-testnet.polygonscan.com',
};

module.exports = function(chain, timeout, proxyUrl, headers) {
  var param = {
    timeout: timeout
  };

  var baseUrl = pickChainUrl(chain);
  if (proxyUrl && 0 < proxyUrl.length) {
    if (proxyUrl.charAt(proxyUrl.length - 1) == '/') {
      baseUrl = proxyUrl + baseUrl;
    } else {
      baseUrl = proxyUrl + '/' + baseUrl;
    }
  }
  param['baseURL'] = baseUrl;

  if (headers) {
    param['headers'] = headers;
  }

  var client = axios.create(param);

  /**
   * @param query
   * @returns {Promise<any>}
   */
  function getRequest(query) {
    return new Promise(function(resolve, reject) {
      client.get('/api?' + query).then(function(response) {
        var data = response.data;

        if (data.status && data.status != 1) {
          let returnMessage = data.message ||'NOTOK';
          if (data.result && typeof data.result === 'string') {
            returnMessage = data.result;
          } else if (data.message && typeof data.message === 'string') {
            returnMessage = data.message;
          }

          return reject(returnMessage);
        }

        if (data.error) {
          var message = data.error;

          if(typeof data.error === 'object' && data.error.message){
            message = data.error.message;
          }

          return reject(new Error(message));
        }

        resolve(data);
      }).catch(function(error) {
        return reject(new Error(error));
      });
    });
  }

  return getRequest;
};
