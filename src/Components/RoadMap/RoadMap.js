import styled from "styled-components";
import { Col } from "react-bootstrap";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useState } from "react";

const Wrapper = styled.div`
  padding: 55px 0;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 125%;

    color: #ffffff;
  }
  .tagline {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 152%;
    color: #ffffff;
    padding: 15px 0;
    padding-bottom: 30px;
  }
  .socialContainer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    justify-content: center;
  }
  .social {
    display: flex;
    jusitfy-content: center;
    align-items: center;
    padding: 12px 18px;
    border: 1px solid #0bd488;
    border-radius: 8px;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
    /* identical to box height, or 16px */
    margin-top: 15px;
    color: #ffffff;
    background: transparent;
  }
  .active {
    background: #0bd488;
    color: #fff;
    border: 1px solid #0bd488;
  }
  .name {
    padding-left: 8px;
  }
  .vertical-timeline-element-title {
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 125%;
    text-transform: capitalize;
    color: #ffffff;
  }
  .vertical-timeline-element-subtitle {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 155%;
    color: rgba(255, 255, 255, 0.9);
  }
  .vertical-timeline {
    padding: 0;
    width: 100% !important;
    max-width: 100% !important;
  }

  .vertical-timeline-element-content {
    box-shadow: none;
    color: #fff;
    background: transparent;
    padding: 0;
    padding-top: 5px;
  }
  .vertical-timeline-element-content-arrow {
    display: none;
  }
  .vertical-timeline-element-icon {
    box-shadow: none;
    font-size: 35px;
    border-radius: 0%;
  }
  .vertical-timeline::before {
    background: #c1c4ce;
    top: 8px;
    width: 3px;
    height: 98%;
  }
  .star {
    width: 30px;
    height: 70px;
    background: #000;
    margin-left: 5px;
    display: flex;
    jusitfy-content: center;
    align-items: center;
  }

  .main-container::before {
    position: absolute;
    left: -50%;
  }
  ${
    "" /* .main-container1::before {
    content: url(./images/roadmap1.png);
  }
  .main-container2::before {
    content: url(./images/roadmap2.png);
  }
  .main-container3::before {
    content: url(./images/roadmap3.png);
  }
  .main-container4::before {
    content: url(./images/roadmap4.png);
  }
  .main-container5::before {
    content: url(./images/roadmap5.png);
  } */
  }
  ${
    "" /* 
  @media only screen and (max-width: 1457px) {
    .vertical-timeline::before {
      height: 99%;
    }
  }
  @media only screen and (max-width: 1399px) {
    .main-container::before {
      left: -55%;
    }
  }
  @media only screen and (max-width: 1199px) {
    .main-container::before {
      left: -60%;
    }
  }

  @media only screen and (max-width: 1050px) {
    .main-container::before {
      left: -65%;
    }
  } */
  }
  @media only screen and (max-width: 991px) {
    ${
      "" /* .main-container::before {
      display: none;
    } */
    }
    br {
      display: none;
    }
  }
  @media only screen and (max-width: 767px) {
    .socialContainer {
      padding-bottom: 20px;
    }
  }
`;
const RoadMap = () => {
  const [value, setValue] = useState(null);
  const socialArray = [
    { name: "Discord", icon: "/images/discord.png" },

    { name: "Twitter", icon: "/images/twitter.png" },
    { name: "Instagram", icon: "/images/instagram.png" },
  ];
  const roadmap = [
    {
      img: "./images/roadmap1.png",
      title: "Our Own Token",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      text2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here.",
    },
    {
      img: "./images/roadmap2.png",
      title: "Our Own Token",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      text2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here.",
    },
    {
      img: "./images/roadmap3.png",
      title: "Our Own Token",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      text2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here.",
    },
    {
      img: "./images/roadmap4.png",
      title: "Our Own Token",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      text2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here.",
    },
    {
      img: "./images/roadmap5.png",
      title: "Our Own Token",
      text1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
      text2:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here.",
    },
  ];

  return (
    <Wrapper id="roadmap" data-aos="fade-up">
      <Col xs={11} lg={10} xl={9} xxl={8} className="mx-auto">
        {" "}
        <div className="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row">
          <div>
            {" "}
            <h3 className="title">RoadMap</h3>
            <p className="tagline">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />{" "}
              accumsan hendrerit commodo.
            </p>
          </div>
          <div className="socialContainer">
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
        </div>
        <VerticalTimeline layout="1-column-left">
          {roadmap.map((el, i) => (
            <VerticalTimelineElement
              key={i}
              icon={
                <div className="star">
                  <img src="./images/star.png" alt='starspangled awesome' />
                </div>
              }
            >
              <div
                className={`d-flex flex-column mt-3 main-container main-container${
                  i + 1
                }`}
              >
                <span className="vertical-timeline-element-title">
                  {i + 1}. {el.title}
                </span>
                <span className="vertical-timeline-element-subtitle mt-3">
                  {el.text1}
                </span>
                <span className="vertical-timeline-element-subtitle mt-3">
                  {el.text2}
                </span>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Col>
    </Wrapper>
  );
};
export default RoadMap;
