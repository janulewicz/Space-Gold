import React from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
const Wrapper = styled.div`
  .image-container {
    display: flex;
    align-items: center;
  }
  .image {
    border-radius: 8px;
    margin: 15px 0;
    width: 300px;
  }
  @media only screen and (max-width: 1399px) {
    .image {
      width: 240px;
    }
  }
  @media only screen and (max-width: 767px) {
    .image {
      width: 200px;
    }
  }
  @media only screen and (max-width: 450px) {
    .image {
      width: 170px;
    }
  }
`;

const Gallary = () => {
  const gallary = [
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
    "./images/1.png",
  ];
  return (
    <Wrapper>
      <Marquee speed={100} gradientColor={[""]} data-aos="fade-up">
        <div className="image-container">
          {" "}
          {gallary.map((el, i) => (
            <div key={i} className="mx-2" data-aos="fade-down">
              <img src={el} alt="#" className="image" />
            </div>
          ))}
        </div>
      </Marquee>
      <Marquee gradientColor={[""]} speed={100}>
        <div className="image-container" data-aos="fade-up">
          {gallary.map((el, i) => (
            <div key={i} className="mx-2 w-100">
              <img src={el} alt="#" className="image" />
            </div>
          ))}
        </div>
      </Marquee>
    </Wrapper>
  );
};
export default Gallary;
