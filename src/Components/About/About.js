import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 55px 0;
  padding-top: 100px;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 52px;
    line-height: 120%;
    letter-spacing: 0.01em;

    color: #ffffff;
    padding-bottom: 15px;
  }
  .text {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 152%;
    width: 90%;
    padding-top: 18px;
    /* or 30px */

    color: #ffffff;
  }
  .image {
    width: 80%;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1500px) {
    .text {
      width: 100%;
    }
  }
  @media only screen and (max-width: 1222px) {
    br {
      display: none;
    }
    .title {
      font-size: 47px;
    }
    .text {
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 991px) {
    .image {
      width: 100%;
    }
  }
  @media only screen and (max-width: 767px) {
    .title {
      font-size: 40px;
      text-align: center;
    }
    .text {
      font-size: 16px;
      text-align: center;
    }
    .image {
    }
  }
`;
const About = () => {
  return (
    <Wrapper id="about" data-aos="fade-up">
      <Col xs={11} md={10} xl={9} xxl={8} className="mx-auto">
        <Row className="align-items-center">
          <Col md={7} lg={6} className="my-3 my-md-0" data-aos="fade-right">
            <h3 className="title">
              About Trash Panda <br /> Gang
            </h3>
            <p className="text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s.
            </p>
            <p className="text">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type.
            </p>
            <p className="text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s.
            </p>
          </Col>
          <Col
            data-aos="fade-left"
            sm={8}
            md={5}
            lg={6}
            className="d-flex justify-content-center align-items-center my-3 my-md-0 mx-auto"
          >
            <img src="/images/about.png" alt="#" className="image mx-auto" />
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default About;
