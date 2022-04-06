import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/herobg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding-top: 180px;

  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 156%;
    color: #2fd4e7;
  }
  .text {
    font-family: Poppins;
    font-style: italic;
    font-weight: 500;
    font-size: 16px;
    line-height: 156%;
    text-align: center;
    color: #ffffff;
    padding: 25px 0;
  }
  .image {
    width: 100%;
  }
  .plato {
    color: #f99c00;
  }
  @media only screen and (max-width: 991px) {
    .title {
      font-size: 36px;
    }
    br {
      display: none;
    }
  }
  @media only screen and (max-width: 767px) {
    .title {
      text-align: center;
    }
    .image {
      width: 70%;
    }
  }
  @media only screen and (max-width: 520px) {
    .image {
      width: 100%;
    }
  }
  @media only screen and (max-width: 400px) {
    .title {
      font-size: 28px;
    }
    .text {
      font-size: 14px;
    }
  }
`;
const HeroSection = () => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <Row>
          <Col
            md={7}
            xxl={6}
            className="d-flex justify-content-center align-items-center py-3 py-md-0"
          >
            <h2 className="title">
              CONNECTING CRYPTO INVESTORS WITH METEORITE HUNTERS
            </h2>
          </Col>
          <Col
            md={5}
            xxl={6}
            className="d-flex justify-content-center align-items-center py-3 py-md-0"
          >
            <img src="./images/hero.png" alt="#" className="image" />
          </Col>
        </Row>
        <p className="text">
          “Those who are able to see beyond the shadows and lies of their
          culture will never be understood, <br /> let alone believed, by the
          masses.” ...<span className="plato">Plato</span>
        </p>
      </Col>
    </Wrapper>
  );
};
export default HeroSection;
