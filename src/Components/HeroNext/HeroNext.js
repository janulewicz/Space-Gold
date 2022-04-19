import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/heronext.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding: 25px 0;

  .text {
    font-family: Zilla Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    padding-bottom: 13px;
  }
  .image {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    .text {
      text-align: center;
    }
    .image {
      width: 70%;
    }
  }
  @media only screen and (max-width: 520px) {
    .text {
      font-size: 14px;
    }
    .image {
      width: 100%;
    }
  }
`;
const HeroNext = () => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <Row className="flex-column-reverse flex-md-row">
          <Col
            md={7}
            xxl={6}
            className="d-flex flex-column  justify-content-center align-items-start py-3 py-md-0"
          >
            <p className="text">
              Space Gold Coin was conceptualised by members of Insite
              Archaeological Sevices Ltd; A meteorite hunting company that seeks
              to accrue museum grade artefacts using modern technologies. The
              primary purpose of the Space Gold Coin project is to facilitate
              wealth accumulation in order to hedge against impending financial
              deterioration and government instability.
            </p>

            <p className="text">
              Our project is motivated by the adoption of the crypto anarchist
              manifesto: A document that propagates a decentralised and
              anonymous political philosophy through the use of blockchain
              technology.
            </p>
            <p className="text">
              Our belief in the success of meteorite recovery is centred around
              the recent discovery of a meteorite impact site located in inner
              Mongolia, as well as the efficient recovery methods our team has
              perfected over recent years.{" "}
            </p>

            <p className="text p-0">
              The meteorite which landed in inner Mongolia, during July 2021, is
              estimated to be worth 5,000,000 USD, providing more than enough
              wealth to finance the Space Gold Coin project as we continue to
              locate other sites.
            </p>
          </Col>
          <Col
            md={5}
            xxl={6}
            className="d-flex justify-content-center align-items-center py-3 py-md-0"
          >
            <img src="./images/heronext.png" alt="#" className="image" />
          </Col>
        </Row>
        <div className="overlay"></div>
      </Col>
    </Wrapper>
  );
};
export default HeroNext;
