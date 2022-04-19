import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/problembg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding: 25px;
  padding-bottom: 50px;
  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 72px;
    color: #2fd4e7;
  }
  .box {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;

    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    padding: 15px 20px;
    border-radius: 0 50px 0 50px;
    height: 100%;
    display: flex;
    align-items: center;
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
    .box {
      font-size: 14px;
    }
  }
`;
const ProblemAndSolution = ({ title, data }) => {
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <h1 className="title">{title}</h1>
        <Row className="justify-content-center px-2 px-lg-5">
          {data.map((el, i) => (
            <Col
              md={6}
              key={i}
              className="d-flex justify-content-center align-items-center my-3"
            >
              <div
                className="box"
                style={{ background: i % 2 === 0 ? "#107245" : "#074EA2" }}
              >
                {el}
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default ProblemAndSolution;
