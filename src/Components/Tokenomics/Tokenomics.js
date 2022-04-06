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
    font-size: 18px;
    line-height: 170%;
    color: #ffffff;
    padding: 12px 0;
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
        <h2 className="title">Tokenomics</h2>
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
              <p className="text">RAISING $500K AT IDO</p>
              <p className="text">100 MILLION COINS</p>
              <p className="text">PRIVATE SALE PRICE 0.004 USD</p>{" "}
              <p className="text">FIRST ROUND SALE AT 0.005 USD</p>
              <p className="text">SECOND ROUND AT 0.006 USD</p>
            </div>
          </Col>
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default Tokenomics;
