import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MyCountDown from "../MyCountDown/MyCountDown";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 300px 25px;
  background: url(./images/hero.png) #000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: #fff;

  .title {
    font-weight: normal;
    font-size: 85px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
    text-shadow: 0px 2px 8px rgba(64, 63, 63, 0.3), 0px 4px 8px #000000;
  }
  .panda {
    color: #0bd488;
  }
  .text {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 170%;
    /* or 31px */
    padding-top: 20px;
    text-align: center;

    color: #ffffff;

    text-shadow: 0px 2px 8px rgba(33, 33, 33, 0.3);
  }
  .socialContainer {
    display: grid;
    grid-template-columns: repeat(4, 140px);
    justify-content: center;
  }
  .social {
    display: flex;
    jusitfy-content: center;
    align-items: center;
    padding: 12px 18px;
    border: 1px solid #0bd488;
    border-radius: 8px;
    font-family: TT Firs Neue;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
    /* identical to box height, or 16px */

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
  @media only screen and (max-width: 1399px) {
    .title {
      font-size: 65px;
    }

    .text {
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 575px) {
    height: auto;
    padding: 200px 25px;
    br {
      display: none;
    }
    .title {
      font-size: 50px;
    }
    .text {
      font-size: 16px;
    }
    .socialContainer {
      display: grid;
      grid-template-columns: repeat(2, 140px);
      justify-content: center;
    }
    .social {
      margin-bottom: 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    .title {
      font-size: 42px;
    }
    height: auto;
    padding: 170px 10px;
  }
`;
const HeroSection = () => {
  const [value, setValue] = useState(0);
  const socialArray = [
    { name: "Discord", icon: "/images/discord.png" },
    { name: "OpenSea", icon: "/images/opensea.png" },
    { name: "Twitter", icon: "/images/twitter.png" },
    { name: "Instagram", icon: "/images/instagram.png" },
  ];
  return (
    <Wrapper id="hero" data-aos="fade-up">
      <h1 className="title" data-aos="fade-down">
        TRASH <span className="panda">PANDA </span>
        GANG
      </h1>
      <p className="text" data-aos="fade-down">
        Trash Panda Gang NFT will produce a unique collection of 7777 pieces.{" "}
        <br />
        They are going to conquer the Metaverse with their whole Gang.
      </p>
      <MyCountDown dayCount="April 05, 2022 20:00:00" />

      <div className="socialContainer" data-aos="fade-up">
        {socialArray.map((el, i) => (
          <div
            key={i}
            className={value === i ? "social active mx-2" : "social  mx-2"}
            onClick={() => setValue(i)}
          >
            <img src={el.icon} alt="#" />
            <p className="name">{el.name}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default HeroSection;
