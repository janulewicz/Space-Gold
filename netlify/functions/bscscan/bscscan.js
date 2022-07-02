

const fetch = require('node-fetch')

const ethers = require('ethers')

const BNBWallet = "0x749Ed5585af09f9bF60D5Fa29FdB9F7b8bC4e00F"

const BUSDWallet = "0x749Ed5585af09f9bF60D5Fa29FdB9F7b8bC4e00F"

const BSCSCAN = process.env.BSCSCAN

var HOLDINGS = 0

const getApiData = async (resp, account) => {
  for (let [, value] of Object.entries(resp.result)) {
    if (value.from === account) {
      let amount = parseFloat(ethers.utils.formatEther(value.value))
      HOLDINGS = + amount
    }
  }
  return HOLDINGS;
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
}

exports.handler = async (event, context) => {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    }
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body)
  const account = payload.account
  try {
    let response = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${BNBWallet}&startblock=9000000&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${BSCSCAN}`)
    let data = await response.json();
    let holdings = await getApiData(data, account);
    response = await fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${BUSDWallet}&startblock=9000000&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${BSCSCAN}`)
    data = await response.json();
    holdings = await getApiData(data, account);
    if (holdings > 0) {
      console.log(data)
      console.log(holdings)
      return { statusCode: 200, 
        headers: CORS_HEADERS,
        body: "true" };
    }
    else {
      return { statusCode: 200, 
        headers: CORS_HEADERS,
        body: "false" };
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
