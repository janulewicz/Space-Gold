

const fetch = require('node-fetch')

const ethers = require('ethers')

const BNBWallet = "0x749Ed5585af09f9bF60D5Fa29FdB9F7b8bC4e00F"

const BUSDContract = "0xe9e7cea3dedca5984780bafc599bd69add087d56"

const BSCSCAN = process.env.BSCSCAN

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
}

exports.handler = async (event, context) => {

  var HOLDINGS = 0

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    }
  }

  const getBNBTransactions = async (resp, account) => {
    for (let [, value] of Object.entries(resp.result)) {
      if (value.from === account) {
        let amount = parseFloat(ethers.utils.formatEther(value.value))
        HOLDINGS = + amount
      }
    }
    return HOLDINGS;
  };

  const getBUSDTransactions = async (resp, account) => {
    for (let [, value] of Object.entries(resp.result)) {

      if (value.from === account) {
        let amount = parseFloat(ethers.utils.formatEther(value.value))
        HOLDINGS = + amount
      }
    }
    return HOLDINGS;
  };

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body)
  const account = payload.account
  console.log(account)
  try {
    let response = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${BNBWallet}&startblock=9000000&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${BSCSCAN}`)
    let data = await response.json();
    let holdings = await getBNBTransactions(data, account);
    console.log(data)
    response = await fetch(`https://api.bscscan.com/api?module=account&action=tokentx&contractAddress=${BUSDContract}&address=${BNBWallet}&startblock=9000000&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${BSCSCAN}`)
    data = await response.json();
    console.log(data)
    holdings = + await getBUSDTransactions(data, account);
    if (holdings > 0) {
      console.log(holdings)
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: "true"
      };
    }
    else {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: "false"
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
