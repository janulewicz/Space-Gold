import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { FaEthereum, FaWindowClose } from 'react-icons/fa';
import Button from 'react-bootstrap/Button'
import { info, useMetaMaskBrowser, generic } from './Messages'
import { useMetaMask } from "metamask-react";
import React from "react";



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
        window.open("https://metamask.app.link/dapp/deploy-preview-11--lucent-bienenstitch-e3bf48.netlify.app")
      }}>
        <FaEthereum /> Open In Metamask Browser
      </Button>{' '}
      {' '}
      <Button variant="primary"
        onClick={() => { closeSnackbar(key) }}>
        <FaWindowClose />
      </Button>{' '}
    </Fragment >
  )

  const connected = key => (
    <Fragment>to account {account.substring(0, 4)}... on BSC. &nbsp;
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
    const url = 'https://www.spacegoldcoin.io/.netlify/functions/bscscan';
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
        setInvestments(true)
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
        message(useMetaMaskBrowser, mobile)
      }
    }

    if (status === "connected") {
      if (chainId === "0x38") {
        message(info, connected)
        check_investor(account)
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
            INVESTED IN SPACEGOLD COIN!!
          </Button>{' '}
        </Fragment>
      )
    }

    if (chainId !== "0x38") {
      console.log(chainId)
      return (
        <Button onClick={() => addChain(bscChainNetworkParams)}>SWITCH METAMASK TO BSC CHAIN AND RELOAD</Button>
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
