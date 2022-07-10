import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { FaEthereum, FaWindowClose } from 'react-icons/fa';
import Button from 'react-bootstrap/Button'
import { info, useMetaMaskBrowser, generic } from './Messages'
import { useMetaMask } from "metamask-react";
import React from "react";
// import { ethers } from "ethers";

var URL = "spacegoldcoin.io"

var DEEP_LINK = "https://metamask.app.link/dapp/"

const context = process.env.REACT_APP_CONTEXT 
const deploy_url = process.env.REACT_APP_DEPLOY_PRIME_URL

if (context != null) {
  URL = (context === "production") ? URL : deploy_url;
}

function Wallet(props) {

  const { addChain } = useMetaMask();
  const bscChainNetworkParams = {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"]
  };

  //Types of toast, also see Messages.j
  const action = key => (
    <Fragment>
      <Button variant="primary"
        onClick={() => { closeSnackbar(key) }}>
        <FaWindowClose />
      </Button>{' '}
    </Fragment>
  )
  const mobile = key => (
    <Fragment>
      <Button variant="warning" onClick={() => {
        // open the deeplink page 
        window.open(`${DEEP_LINK}${URL}`)
      }}>
        <FaEthereum /> Please Open In Metamask Browser
      </Button>{' '}
      {' '}
      <Button variant="primary"
        onClick={() => { closeSnackbar(key) }}>
        <FaWindowClose />
      </Button>{' '}
    </Fragment >
  )

  const install = key => (
    <Fragment>
      <Button variant="warning" onClick={() => {
        // open metamask install page
        window.open(`${DEEP_LINK}`)
      }}>
        <FaEthereum /> Please Install Metamask!
      </Button>{' '}
      {' '}
      <Button variant="primary"
        onClick={() => { closeSnackbar(key) }}>
        <FaWindowClose />
      </Button>{' '}
    </Fragment >
  )

  const connected = key => (
    <Fragment>{account} &nbsp;
      {' '}
      <Button variant="primary"
        onClick={() => { closeSnackbar(key) }}> {' '}
        <FaWindowClose />
      </Button>{' '}
    </Fragment >
  )

  // States
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [investments, setInvestments] = useState(false);

  const { status, connect, account, chainId } = useMetaMask();
  // Sending a message of various types.
  function message(props, type) {
    enqueueSnackbar(props.message,
      props.formatting,
      props.formatting.action = type
    )
  }

  function check_investor(props) {
    const url = '.netlify/functions/bscscan';
    // post body data 
    const payload = {
      account: props,
    };

    // request options
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    // send POST request
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        setInvestments(res)
        return (res)
      })
  }

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    if (status === "unavailable") {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        message(useMetaMaskBrowser, mobile)
      }
      else {
        message(useMetaMaskBrowser, install)
      }
    }

    if (status === "connected") {
      if (chainId === "0x38") {
        message(info, connected)
        check_investor(account)


        // const provider = new ethers.providers.Web3Provider(window.ethereum)

        // // The MetaMask plugin also allows signing transactions to
        // // send ether and pay to change state within the blockchain.
        // // For this, you need the account signer...
        // const signer = provider.getSigner()
        // signer.sendTransaction({
        //   to: "0x749Ed5585af09f9bF60D5Fa29FdB9F7b8bC4e00F",
        //   value: ethers.utils.parseEther("0.0008")
        // });
      }
    }

    if (status === "notConnected") message(generic, action)

  }, [status]);

  if (status === "notConnected") {
    return (
      <Fragment>
        <Button onClick={connect}>
          CONNECT WALLET
        </Button>
      </Fragment>
    )
  }
  if (status === "connected") {
    console.log(investments, status)
    if (investments) {
      return (
        <Fragment>
          <Button variant="info" size="lg" disabled>
            YOU'RE INVESTED IN SPACEGOLD COIN!!
          </Button>{' '}
        </Fragment>
      )
    }

    if (chainId !== "0x38") {
      console.log(chainId)
      return (
        <Button onClick={() => addChain(bscChainNetworkParams)}>SWITCH METAMASK TO BSC CHAIN</Button>
      )
    }
    else {
      return (
        <Fragment>
          <Button variant="info" size="lg" href="https://docs.google.com/forms/d/13FXdcAD4SAFY2eNNNvK_FeTQg44ng2RPjUyCp7To-Q4">INVEST IN SPACEGOLDCOIN</Button>{' '}
        </Fragment>
      )
    }
  }
  else {
    return <Fragment />
  }

}

export default Wallet;
