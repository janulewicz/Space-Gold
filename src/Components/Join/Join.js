import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 55px 0;
  .title {
    font-style: normal;
    font-weight: normal;
    font-size: 80px;
    line-height: 122%;

    color: #ffffff;
  }
  .socialContainer {
    display: grid;
    grid-template-columns: repeat(2, 150px);
  }
  .social {
    display: flex;
    jusitfy-content: center;
    align-items: center;
    padding: 12px 18px;
    border: 1px solid #fff;
    border-radius: 8px;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
    /* identical to box height, or 16px */
    margin-top: 15px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
  }
  .active {
    background: #0bd488;
    color: #fff;
    border: 1px solid #0bd488;
  }
  .name {
    padding-left: 8px;
  }
  .image {
    width: 70%;
  }
  @media only screen and (max-width: 991px) {
    .image {
      width: 85%;
    }
  }
  @media only screen and (max-width: 767px) {
    .title {
      font-size: 70px;
      text-align: center;
    }
    .image {
      width: 85%;
    }
  }
`;
const Join = () => {
  const [value, setValue] = useState(0);
  const socialArray = [
    { name: "Discord", icon: "/images/discord.png" },
    { name: "OpenSea", icon: "/images/opensea.png" },
    { name: "Twitter", icon: "/images/twitter.png" },
    { name: "Instagram", icon: "/images/instagram.png" },
  ];
  return (
    <Wrapper>
      <Col xs={11} md={10} xl={9} xxl={8} className="mx-auto">
        <h2 className="title  d-md-none">Join Us!</h2>{" "}
        <Row className="align-items-center flex-column-reverse flex-md-row">
          <Col
            md={6}
            lg={5}
            className="my-3 my-0 d-flex flex-column align-items-center lign-items-md-start"
            data-aos="fade-right"
          >
            <h2 className="title d-none d-md-block">Join Us!</h2>{" "}
            <div className="socialContainer">
              {socialArray.map((el, i) => (
                <div
                  key={i}
                  className={
                    value === i ? "social active mx-2" : "social  mx-2"
                  }
                  onClick={() => setValue(i)}
                >
                  <img src={el.icon} alt="#" />
                  <p className="name">{el.name}</p>
                </div>
              ))}
            </div>
          </Col>
          <Col
            data-aos="fade-left"
            sm={7}
            md={6}
            lg={7}
            className="my-3 my-0 d-flex justify-content-center justify-content-md-start"
          >
            <img src="./images/join.png" alt="#" className="image" />
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default Join;
