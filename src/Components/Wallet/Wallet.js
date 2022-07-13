import { useSnackbar } from 'notistack';
import { Fragment, useEffect, useState } from 'react';
import { FaEthereum, FaWindowClose, FaQuestionCircle } from 'react-icons/fa';
import { Link } from "react-scroll";
import Button from 'react-bootstrap/Button'
import { info, useMetaMaskBrowser, generic, privateSale, success } from './Messages'
import { bscChainNetworkParams } from './Constants'

import { useMetaMask } from "metamask-react";
import React from "react";

const DEEP_LINK = "https://metamask.app.link/dapp/";
const GOOGLE_FORM = "https://docs.google.com/forms/d/13FXdcAD4SAFY2eNNNvK_FeTQg44ng2RPjUyCp7To-Q4"
// import { ethers } from "ethers";
var URL = process.env.REACT_APP_URL

if (process.env.REACT_APP_CONTEXT != null) {
  URL = (process.env.REACT_APP_CONTEXT === "production") ? process.env.REACT_APP_URL : process.env.REACT_APP_DEPLOY_PRIME_URL
}

const style = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "18px",
  lineHeight: "150%",

  textTransform: "uppercase",
  color: "#2fd4e7",
  textDecoration: "none",
  cursor: "pointer",
  padding: "10px",
};

const Wallet = ({ help, viewHelp }) => {
  const { addChain } = useMetaMask();
  //Types of toast, also see Messages.j
  const action = key => (
    <Fragment>
      <CloseSnack key={key} />
    </Fragment>
  )

  const mobile = key => (
    <Fragment>
      <Button variant="warning" onClick={() => {
        // Open the deeplink page 
        window.open(`${DEEP_LINK}${URL}`)
      }}>
        <FaEthereum /> Please Open In Metamask Browser
      </Button>{' '}
      <CloseSnack key={key} />
    </Fragment >
  )

  const install = key => (
    <Fragment>
      <Button variant="warning" onClick={() => {
        // Open metamask install page
        window.open(`${DEEP_LINK}`)
      }}>
        <FaEthereum /> Please Install Metamask!
      </Button>{' '}
      <CloseSnack key={key} />
    </Fragment >
  )

  const connected = key => (
    <Fragment>{account} &nbsp;
      {' '}
      <CloseSnack key={key} />
    </Fragment >
  )

  const invested = key => (
    <Fragment><span role="img" aria-label="spacegold">&#x1F4B8; &nbsp; &nbsp;</span> 
      {' '}
      <CloseSnack key={key} />
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

  function CloseSnack({ snack }) {
    return (
      <Fragment>
        <Button variant="primary"
          onClick={() => { closeSnackbar(snack) }}>
          <FaWindowClose />
        </Button>
      </Fragment>
    );
  }

  function Help() {
    return (
      <Fragment>
        {status !== "notConnected" &&
          <div style={style} onClick={() => window.open(GOOGLE_FORM)}>INVEST</div>}
        {status === "unavailable" &&
          <div style={style} onClick={() => { window.open(`${DEEP_LINK}${URL}`) }}>
            METAMASK</div>}
        <Link onClick={() => { viewHelp(true) }}
          to="Help"
          smooth={true}
          offset={-150}
          duration={250}>
          <div style={style}>
            <FaQuestionCircle />
            {window.innerWidth < 1000 && " HELP" }
          </div>
        </Link>
      </Fragment>
    );
  }

  useEffect(() => {
    if (help) {
      message(privateSale, action)
    }
  }, [help]);

  useEffect(() => {
    if (investments === true) {
      message(success, invested)
    }
  }, [investments]);

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
      if (chainId === bscChainNetworkParams.chainId) {
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
          CONNECT METAMASK
        </Button>
        <Help />
      </Fragment>
    )
  }
  if (status === "connected") {
    if (investments) {
      return (
        <Fragment>
          <Button variant="info" size="lg" disabled>
            INVESTED
          </Button>{' '}
          <Fragment>
            <div style={style} onClick={() => window.open(GOOGLE_FORM)}>
              BUY MORE
            </div>
          </Fragment>
        </Fragment>
      )
    }

    if (chainId !== "0x38") {
      return (
        <Button onClick={() => addChain(bscChainNetworkParams)}>SWITCH METAMASK TO BSC CHAIN</Button>
      )
    }
    else {
      return (
        <Help />
      )
    }
  }
  else {
    return (
      <Help />
    )
  }

}

export default Wallet;
