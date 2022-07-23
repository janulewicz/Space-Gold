import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { FaTelegramPlane, FaTwitter, FaInstagram, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-scroll";



const Wrapper = styled.div`
  background: url(./images/heronext.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding: 25px 0;
  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 72px;
    color: #2fd4e7;
  }
  .text {
    font-family: Poppins;
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    padding-bottom: 13px;
  }
  .text a {
    text-decoration: none;
    font-family: Poppins;
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #2fd4e7;
    padding-bottom: 13px;
  }
  .text a:hover{
    color: #ffffff;
  }
  .icon {
    padding: 13px;
  }
  .image {
    width: 100%;
  }
  .overlay {
    background: rgba(0, 0, 0, 1);
  }
  @media only screen and (max-width: 991px) {
    .title {
      font-size: 36px;
    }
  }

  @media only screen and (max-width: 400px) {
    .title {
      font-size: 28px;
    }
  }
`;
const Contact = ({ viewHelp }) => {

  const iconArray = [
    { product: "Telegram", icon: <FaTelegramPlane />, link: "https://t.me/SpaceGold1" },
    { product: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/spacegoldcoin?t=EhwAUeZZ9u3QqxNFLzSuuw&s=09" },
    { product: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/spacegoldcoin?igshid=YmMyMTA2M2Y=" },
  ];

  return (
    <Wrapper id="contact">
      <Col xs={11} xxl={10} className="mx-auto">
        <p className="title">CONTACT</p>
        <p className="text">
        </p>
        <p className="text">
          SpaceGold is in private sale...
        </p>
        <p className="text">
          Join our communities to find out the latest Space Gold news...
        </p>
        <Row>
          {iconArray.map((el, i) => (
            <Col xs={6} md={3} key={i} className="py-4 py-md-0">
              <div className="team-box d-flex flex-column justify-content-between align-items-center">
                <p className="text">
                  <a href={el.link}>
                    {el.icon} {el.product}
                  </a>
                </p>
              </div>
            </Col>
          ))}
          <Col xs={6} md={3} key={"help"} className="py-4 py-md-0">
            <div className="team-box d-flex flex-column justify-content-between align-items-center">
              <p className="text">
                <Link onClick={() => { viewHelp(true) }}
                  to="Help"
                  className="text"
                  smooth={true}
                  offset={-150}
                  duration={250}>
                  <FaQuestionCircle /> Help
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>


  );
};
export default Contact;
