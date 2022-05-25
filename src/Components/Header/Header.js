import React, { useState, useEffect } from "react";
import ChainLogo from '../../assets/ChainLogos'
import styled from "styled-components";
import { Col, Button } from 'react-bootstrap'
import { Alert, Snackbar } from '@mui/material';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, animateScroll as scroll } from "react-scroll";
// import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';



const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  background: #17120f;
  z-index: 5;
  .menuItem {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;

    text-transform: uppercase;
    color: #2fd4e7;
    text-decoration: none;
    cursor: pointer;
  }
  .message-list {
    font-family: Poppins;
    font-style: bold;
    font-weight: 600;
    font-size: 10px;
    line-height: 20px;
    text-transform: uppercase;
    color: #ffffff;
  }
  .button {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    outline: 0;
    border: 0;
    border-radius: 8px;
    padding: 10px;
    margin-left: 18px;
    background: #f99c00;
  }
  .hamburger {
    cursor: pointer;
  }

  .sidebar {
    padding: 25px 0;
    padding-top: 0;
    position: absolute;
    top: 100px;
    left: 0;
    background: #17120f;
    width: 100%;
    transition: 1s;
  }
`;

let vertical = "top"
let horizontal = "right"

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [currentChainID, setCurrentChainID] = useState(-1)
  let variant
  const Chain = (props) => {

    const chainId = props.chainId


    let chainLogo
    let chainName

    switch (chainId) {
      case 56: //BNB
        chainLogo = ChainLogo.bnb
        variant = "secondary"
        chainName = "Binance Smart Chain"
        break;
      default: // Unknown network
        chainLogo = ChainLogo.unknown
        variant = "light"
        chainName = "Unknown network?"
        break;
    }

    return (


      <img src={chainLogo} width={14} alt={chainName} />


    )
  }


  const ConnectWallet = async () => {

    console.log(variant);

    try {
      await window.ethereum.enable();

      const id = await window.ethereum.request({ method: 'eth_chainId' })
      setCurrentChainID(() => parseInt(id, 16))

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setIsLogged(true)
      setCurrentAccount(accounts[0])
      return accounts[0]

    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        setMessage(messages => [...messages, { body: 'PLEASE CONNECT TO METAMASK.', variant: 'warning' }])
        scroll.scrollToBottom();

      } else if (err.code === -32002) {
        console.log('Please unlock MetaMask.')
        setMessage(messages => [...messages, { body: 'UNLOCK METAMASK AND RETRY.', variant: 'warning' }])
        scroll.scrollToBottom();
      } else {
        console.error(err);
        setMessage(messages => [...messages, { body: err.message, variant: 'info' }])
      }

    }

  }

  const handleAccountsChanged = (accounts) => {

    console.log('handleAccountsChanged');

    //if(!isLogged) return

    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setMessage(messages => [...messages, { body: 'PLEASE CONNECT TO METAMASK.', variant: 'warning' }])
      scroll.scrollToBottom();
    } else if (accounts[0] !== currentAccount) {
      console.log(accounts[0])
      console.log(messages);
      setCurrentAccount(() => accounts[0])
      setMessage(messages => [...messages, { body: `ACCOUNT CHANGED TO: ${accounts[0]}`, variant: 'warning' }])
    }
  }

  useEffect(() => {

    if (window.ethereum) {
      // window.onbeforeunload = function () { return "Prevent reload" }
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      window.ethereum.on('chainChanged', (_chainId) => {
        console.log(_chainId);
        setCurrentChainID(() => parseInt(_chainId, 16))
        //window.location.reload()
      });
    }

  }, []);

  const shortAddr = () => {
    return `${currentAccount.substr(0, 4)}...${currentAccount.substring(currentAccount.length - 4, currentAccount.length)}`
  }


  const SignIn = async () => {
    //Detect Provider
    const provider = await detectEthereumProvider()
    // const web3 = new Web3(provider)

    if (!provider) {
      setMessage(messages => [...messages, { body: "PLEASE INSTALL METAMASK!", variant: 'warning' }])
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // open the deeplink page 
        window.open("https://metamask.app.link/dapp/deploy-preview-6--lucent-bienenstitch-e3bf48.netlify.app")
      }
      scroll.scrollToBottom();
    } else {
      const address = await ConnectWallet()
      if (address)
        setMessage(messages => [...messages, { body: `ADDRESS: ${address}`, variant: 'success' }])
    }

  }

  const SignOut = async () => {
    setIsLogged(false)
  }

  const Message = (props) => {

    const [show, setShow] = useState(true);

    const close = () => {
      setShow(false)
      setMessage(messages.filter((item, index) => index !== props.id))
    }

    const open = () => {
      setShow(true)
      setMessage(messages.filter((item, index) => index !== props.id))
    }

    if (show) {
      return (
        <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={close}>
          <Alert onClose={close} severity={props.variant} sx={{ width: '100%', height: '110px' }}>
            {props.body}
          </Alert>
        </Snackbar>
      )
    } else {
      return (<></>)
    }


  }

  const [messages, setMessage] = useState([
  ])


  const [sidebar, setSidebar] = useState(false);
  const menus = [
    { name: "Home", to: "HeroSection" },
    { name: "Roadmap", to: "roadmap" },
    { name: "Litepaper", to: "/litepaper-21-05-2022.pdf", pdf: true },
    { name: "Whitepaper", to: "/whitepaper-21-05-2022.pdf", pdf: true },
  ];

  return (
    <Wrapper>

      <Col
        xs={11}
        xxl={10}
        className="mx-auto d-flex justify-content-between align-items-center"
      >
        <img src="./images/logo.png" alt="#" />
        <div className="d-none d-lg-flex align-items-center ">
          {menus.map((el, i) => {
            if (el.pdf) {
              return <a key={i} href={el.to} className="menuItem px-3" target='_blank' rel='noopener noreferrer'>{el.name}</a>
            }
            else {
              return <Link
                to={el.to}
                spy={true}
                smooth={true}
                offset={-150}
                duration={250}
                activeClass="active"
                className="menuItem px-3"
                key={i} >
                {el.name}
              </Link>
            }
          })}
          {/* <Link to="contact"
            spy={true}
            smooth={true}
            offset={-150}
            duration={250}
            activeClass="active"
            className="menuItem px-3"
            key="1" >
            <Button variant="info" href="#">CONNECT WALLET</Button>{' '}</Link> */}
          <div>
          </div>
          {


            messages.map((item, i) => (
              <Message body={item.body} variant={item.variant} id={i} key={i} />
            ))
          }
          <div>
            <Chain chainId={currentChainID} />{' '}
            <Button className="connect-button" disabled={isLogged} onClick={SignIn} variant="info">{isLogged ? shortAddr() : "CONNECT WALLET"}</Button>{' '}
            <Button onClick={SignOut} style={{ visibility: isLogged ? "visible" : "hidden" }} variant="danger">DISCONNECT</Button>
          </div>
        </div>
        <div
          className="hamburger d-flex d-lg-none"
          onClick={() => setSidebar((prev) => !prev)}
        >
          {sidebar ? (
            <IoMdClose color="#fff" size="30" />
          ) : (
            <GiHamburgerMenu color="#fff" size="30" />
          )}
        </div>

        {sidebar && (
          <div
            className={
              "sidebar d-flex  d-lg-none align-items-center  flex-column justify-content-center "
            }
          >
            {menus.map((el, i) => {
              if (el.pdf) {
                return <a key={i} href={el.to} className="menuItem px-3 py-3" target='_blank' rel='noopener noreferrer'>{el.name}</a>
              }
              else {
                return <Link
                  to={el.to}
                  spy={true}
                  smooth={true}
                  offset={-150}
                  duration={250}
                  activeClass="active"
                  className="menuItem px-3 py-3"
                  key={i} >
                  {el.name}
                </Link>
              }
            })}
            {/* <Link to="contact"
              spy={true}
              smooth={true}
              offset={-150}
              duration={250}
              activeClass="active"
              className="menuItem px-3"
              key="1" >
              <Button variant="info" href="#">CONNECT WALLET</Button>{' '}</Link> */}

            {
              messages.map((item, i) => (
                <Message body={item.body} variant={item.variant} id={i} key={i} />
              ))
            }
            <div>
              <Button className="connect-button" disabled={isLogged} onClick={SignIn} variant="info">{isLogged ? shortAddr() : "CONNECT WALLET"}</Button>
              <p></p>
              <Chain chainId={currentChainID} />{' '}
              <p></p>
              <Button onClick={SignOut} style={{ visibility: isLogged ? "visible" : "hidden" }} variant="danger">DISCONNECT</Button>
            </div>
          </div>

        )}
      </Col>
    </Wrapper>
  );
};
export default Header;
