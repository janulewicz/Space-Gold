import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  background: url(./images/problembg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  padding: 25px 0;
  .team-box {
    height: 100%;
  }
  .second-team-box {
    height: 100%;
  }
  .team-image {
    width: 150px;
  }
  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 72px;

    color: #2fd4e7;
  }
  .position {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: #2fd4e7;
    width: 75%;
  }
  .name {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
  }
  .button {
    border: 0;
    outline: 0;
    background: #2fd4e7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;

    color: #000000;
    padding: 10px 12px;
    margin-top: 20px;
  }
  @media only screen and (max-width: 1399px) {
    .position {
      width: 100%;
    }
  }

  @media only screen and (max-width: 991px) {
    .title {
      font-size: 36px;
    }
    .position {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 520px) {
    .team-image {
      width: 100px;
    }
    .position {
      font-size: 18px;
    }
    .name {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 400px) {
    .title {
      font-size: 28px;
    }
  }
`;
const Team = () => {
  const teamArray = [
    { position: "CEO", name: "Jan Janulewicz", image: "./images/ceo.png" },
    { position: "CMO", name: "Darren Humpleby", image: "./images/cmo.png" },
    {
      position: `Director of Field   Operations`,
      name: "Oliver Ades",
      image: "./images/director.png",
    },
    {
      position: "Chief Solutions Architect ",
      name: "Jack Fenton",
      image: "./images/csa.png",
    },
  ];
  return (
    <Wrapper>
      <Col xs={11} xxl={10} className="mx-auto">
        <Row>
          {teamArray.map((el, i) => (
            <Col xs={6} md={3} key={i} className="py-4 py-md-0">
              <div className="team-box d-flex flex-column justify-content-between align-items-center">
                <div className="d-flex flex-column justify-content-start align-items-center second-team-box">
                  <img src={el.image} alt="#" className="team-image" />
                  <div className="position py-2">{el.position}</div>
                  <span className="name">{el.name}</span>
                </div>
                <button className="button">ReadMore</button>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <div className="overlay"></div>
    </Wrapper>
  );
};
export default Team;
