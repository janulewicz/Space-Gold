import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/herobg.jpg);
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

  .image {
    width: 100%;
  }
  .text {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 130%;
    color: #ffffff;
    padding: 12px 0;
  }
  .yellow {
    color: #fff84d;
  }
  .green {
    color: #24ff20;
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
const Tokenomics = () => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <h2 className="title">TOKENOMICS</h2>
        <Row>
          <Col
            md={7}
            xl={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img src="./images/tokenomics.png" alt="#" className="image" />
          </Col>
          <Col
            md={5}
            xl={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <p className="text">
              • 100 million max supply
                <br />• 10% Private sale
                <br />• Private 0.004 usd
                <br />• Presale 0.005 usd
                <br />• Launch 0.006 usd</p><p></p>
              <p className="yellow">8 % sell tax for 3 months</p>
    
              <p className="green"><br />5% buy tax and 5% sell tax for 6 months</p>
              <p className="green">Taxes go on a 50/50 split to liquidity and marketing</p>

            </div>
          </Col>
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default Tokenomics;
