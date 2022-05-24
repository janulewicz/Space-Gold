import React, { useState, useEffect } from "react";
import ChainLogo from '../../assets/ChainLogos'
import styled from "styled-components";
import { Col, Button, Alert } from 'react-bootstrap'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";
import Web3 from 'web3'
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
  .button {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

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

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [currentChainID, setCurrentChainID] = useState(-1)

  const Chain = (props) => {

    const chainId = props.chainId

    let chainLogo
    let variant
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

    console.log("Try Connect");

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
        console.log('Please connect to MetaMask.')
        setMessage(messages => [...messages, { head: "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info' }])

      } else if (err.code === -32002) {
        console.log('Please unlock MetaMask.')
        setMessage(messages => [...messages, { head: "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'info' }])
      } else {
        console.error(err);
        setMessage(messages => [...messages, { head: "Error", body: err.message, variant: 'info' }])
      }

    }

  }

  const handleAccountsChanged = (accounts) => {

    console.log('handleAccountsChanged');

    //if(!isLogged) return

    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setMessage(messages => [...messages, { head: "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info' }])
    } else if (accounts[0] !== currentAccount) {
      console.log(accounts[0])
      console.log(messages);
      setCurrentAccount(() => accounts[0])
      setMessage(messages => [...messages, { head: "Account Changed", body: `addres: ${accounts[0]}`, variant: 'warning' }])
    }
  }

  useEffect(() => {


    // window.onbeforeunload = function () { return "Prevent reload" }
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    window.ethereum.on('chainChanged', (_chainId) => {
      console.log(_chainId);
      setCurrentChainID(() => parseInt(_chainId, 16))
      //window.location.reload()
    });


  }, []);

  const shortAddr = () => {
    return `${currentAccount.substr(0, 4)}...${currentAccount.substring(currentAccount.length - 4, currentAccount.length)}`
  }


  const SignIn = async () => {
    //Detect Provider
    const provider = await detectEthereumProvider()
    const web3 = new Web3(provider)

    if (!provider) {

      setMessage(messages => [...messages, { head: "Wallet not found", body: `Please install MetaMask!`, variant: 'warning' }])

    } else {

      const address = await ConnectWallet()
      if (address)
        setMessage(messages => [...messages, { head: "User Login", body: `addres: ${address}`, variant: 'success' }])

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

    if (show) {
      return (
        <Alert variant={props.variant} onClose={close} dismissible>
          <Alert.Heading>{props.head}</Alert.Heading>
          <p>
            {props.body}
          </p>
        </Alert>
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
          <div className="message-list" >
            {
              messages.map((item, i) => (
                <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
              ))
            }
          </div>
          <div>
            <Chain chainId={currentChainID} />{' '}
            <Button className="connect-button" disabled={isLogged} onClick={SignIn} variant="info">{isLogged ? shortAddr() : "CONNECT WALLET"}</Button>{' '}
            <Button onClick={SignOut} style={{ visibility: isLogged ? "visible" : "hidden" }} variant="danger">X</Button>
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
              <div className="message-list" >
          {
            messages.map((item, i) => (
              <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
            ))
          }
        </div>
        <div>
          <Chain chainId={currentChainID} />{' '}
          <Button className="connect-button" disabled={isLogged} onClick={SignIn} variant="info">{isLogged ? shortAddr() : "CONNECT WALLET"}</Button>{' '}
          <Button onClick={SignOut} style={{ visibility: isLogged ? "visible" : "hidden" }} variant="danger">X</Button>
          </div>
          </div>
         
        )}
      </Col>
    </Wrapper>
  );
};
export default Header;
