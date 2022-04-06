import React from "react";
import { Col } from "react-bootstrap";
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
const RoadMap = () => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <h2 className="title">ROADMAP</h2>
        <img src="./images/roadmap.png" alt="#" className="image" />
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default RoadMap;
