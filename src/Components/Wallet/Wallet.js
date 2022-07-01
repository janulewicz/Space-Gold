import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { FaEthereum, FaWindowClose } from 'react-icons/fa';
import Button from 'react-bootstrap/Button'
import { info, useMetaMaskBrowser, generic } from './Messages'
import { useMetaMask } from "metamask-react";
import React from "react";
import { utils } from 'ethers';
import { Link } from "react-scroll";



function Wallet(props) {

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
        window.open("https://metamask.app.link/dapp/deploy-preview-6--lucent-bienenstitch-e3bf48.netlify.app")
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
  const [investments, setInvestments] = useState(0);

  const { status, connect, account, chainId } = useMetaMask();
  // Sending a message of various types.
  function message(props, type) {
    enqueueSnackbar(props.message,
      props.formatting,
      props.formatting.action = type
    )
  }

  const getApiData = async () => {
    setInvestments(0)
    fetch("https://api.bscscan.com/api?module=account&action=txlist&address=0x749Ed5585af09f9bF60D5Fa29FdB9F7b8bC4e00F&startblock=9000000&endblock=99999999&page=1&offset=1000&sort=asc&apikey=MT31U2WRUXSCGFVYW7UFYD7EZQVXK1TRAX")
      .then((response) => response.json())
      .then((json) => {
        for (let [, value] of Object.entries(json.result)) {
          if (value.from === account) {
            let amount = parseFloat(utils.formatEther(value.value))
            setInvestments(investments + amount)
          }
        }
      })
  };

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
        getApiData()
        message(info, connected)
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
    if (investments > 0) {
      return (
        <Fragment>
          <Button variant="info" size="lg" disabled>
            INVESTED {investments} IN SPACEGOLD COIN!!
          </Button>{' '}
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <Link to="contact"
            spy={true}
            smooth={true}
            offset={-150}
            duration={250}
            activeClass="active"
            className="menuItem px-3"
            key="1" >
            <Button variant="info" size="lg">INVEST IN SPACEGOLDCOIN</Button>{' '}</Link>
        </Fragment>
      )
    }
  }
  else {
    return <Fragment />
  }

}

export default Wallet;
