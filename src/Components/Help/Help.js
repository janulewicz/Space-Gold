import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaWindowClose } from 'react-icons/fa';
import styled from "styled-components";

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
const Help = ({ help, viewHelp }) => {
  if (help) {
    return (
      <Wrapper id="Help">
        <Col xs={11} xxl={10} className="mx-auto">
          <p className="title">HELP &nbsp;
            <FaWindowClose onClick={() => { viewHelp(false) }} /></p>
          <Row>
          </Row>
          Lorum Upsom sALTSÍ
        </Col>
        <div className="overlay"></div>
      </Wrapper>
    )
  }
  else return (
    <Wrapper id="Help">
      <div className="overlay"></div>
    </Wrapper>
  )
};
export default Help;
