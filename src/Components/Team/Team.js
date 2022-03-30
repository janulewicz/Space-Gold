import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 55px 0;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 125%;
    /* identical to box height, or 62px */

    text-align: center;

    color: #ffffff;
  }
  .tagline {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 152%;
    /* or 30px */

    text-align: center;

    color: #ffffff;
  }
  .image {
    width: 100%;
  }
  .position {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */

    color: #0bd488;
  }
  .name {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 100%;
    /* identical to box height, or 22px */

    letter-spacing: 0.02em;

    color: #ffffff;
  }
  .text {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    /* or 24px */

    color: #d9d9d9;
  }
  .social {
    margin-right: 12px;
  }
  @media only screen and (max-width: 520px) {
    br {
      display: none;
    }
    .title {
      font-size: 40px;
    }
  }
`;
const Team = () => {
  const teamArray = [
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
    {
      img: "./images/1.png",
      position: "Managing Director",
      name: "Sonia A. Smith",
      text: "Lorem Ipsum is simply dummy text the printing typesetting industry. Lorem Ipsum been the industry's standard dummy.",
      linkedin: "https://bd.linkedin.com/",
      imdb: "https://www.imdb.com/",
      twitter: "https://twitter.com/",
    },
  ];
  return (
    <Wrapper id="team" data-aos="fade-up">
      <Col xs={11} md={10} xl={9} xxl={8} className="mx-auto">
        <h3 className="title text-center">Our Team Artis</h3>
        <p className="tagline text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />{" "}
          accumsan hendrerit commodo.
        </p>
        <Row className="my-4">
          {teamArray.map((el, i) => (
            <Col
              sm={6}
              md={4}
              key={i}
              className="my-4 d-flex flex-column justify-content-between"
              data-aos="fade-up"
            >
              <div>
                <img src={el.img} alt="#" className="image" />
                <p className="position my-3">{el.position}</p>
                <p className="name">{el.name}</p>
                <p className="text my-3">{el.text}</p>
              </div>
              <div>
                <a
                  href={el.linkedin}
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="./images/linkedin.png" alt="#" />
                </a>
                <a
                  href={el.imdb}
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="./images/imdb.png" alt="#" />
                </a>
                <a
                  href={el.twitter}
                  className="social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="./images/twitter2.png" alt="#" />
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Wrapper>
  );
};
export default Team;
