import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/herobg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;
const Home = () => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <Row>
          <Col md={6}></Col>
          <Col md={6}></Col>
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default Home;
