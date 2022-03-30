import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  .count {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;

    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 100%;

    letter-spacing: 0.01em;

    color: #ffffff;

    text-shadow: 0px 2px 8px rgba(64, 63, 63, 0.3), 0px 4px 8px #000000;
  }
  @media only screen and (max-width: 1399px) {
    .count {
      font-size: 23px;
    }
  }
  @media only screen and (max-width: 575px) {
    .count {
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 400px) {
    .count {
      font-size: 16px;
      padding: 0 10px;
    }
  }
`;
const MyCountDown = ({ dayCount }) => {
  const endTime = new Date(dayCount).getTime();

  const [currentTime, setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; //177670892

  const seconds = 1000; // in milliseconds
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const day = Math.floor(gap / days);
  const hour = Math.floor((gap % days) / hours);
  const minute = Math.floor((gap % hours) / minutes);
  const second = Math.floor((gap % minutes) / seconds);

  useEffect(() => {
    setTimeout(() => setcurrentTime(new Date().getTime()), 1000);
  }, [currentTime]);

  return (
    <Wrapper data-aos="fade-up">
      <div className="count">
        {" "}
        <span>{`${day < 10 ? "0" + day : day}`}</span>
        <span>Days</span>
      </div>

      <div className="count">
        {" "}
        <span>{`${hour < 10 ? "0" + hour : hour}`}</span>
        <span>Hours</span>
      </div>

      <div className="count">
        {" "}
        <span>{`${minute < 10 ? "0" + minute : minute}`}</span>
        <span>Minutes</span>
      </div>

      <div className="count">
        {" "}
        <span>{`${second < 10 ? "0" + second : second}`}</span>
        <span>Seconds</span>
      </div>
    </Wrapper>
  );
};

export default MyCountDown;
