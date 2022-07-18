import React, { useState, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaLinkedin } from 'react-icons/fa';
import styled from "styled-components";
import ReactMarkdown from 'react-markdown'
import icon from './icon.png';

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
  .link {
    font-size: 50px;
    line-height: 12px;
  }
  .greyedout {
    opacity: 0.3;
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
  .bio {
    font-family: Poppins;
    font-style: normal;
    font-weight: 250;
    font-size: 13px;
    line-height: 110%;
    color: #ffffff;
    padding: 6px 8px;
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

  const [moreInfo, setmoreInfo] = useState("More");

  function greyMeteor() {
    return (
      <div className="greyedout"><img src={icon} alt="SpaceGold" width="50" height="50" /></div>
    )
  }

  const teamArray = [
    {
      position: "CEO",
      name: "Jan Janulewicz",
      image: "./images/ceo.png",
      bio: `- Director of Insite Archaeological Services
      employing 20 archaeologists in the UK, turnover
      £1 million
- 15 years experience in archaeological field
    techniques
- 8 years experience drone development
- Studied political economics
- Postgraduate studies in Law of Cryptocurrency at
Franklin Pierce school of Law
- 4 years experience crypto investing, trading and
private equity due diligence
- ICO bounty hunter and cryptocurrency writer and
researcher`,
      link:
        <Button onClick={() => {
          // Open Jan's LinkedIn
          window.open("https://www.linkedin.com/in/jan-janulewicz-107b9184")
        }}>
          <FaLinkedin />
        </Button>
    },

    {
      position: "CMO",
      name: "Darren Humpleby",
      image: "./images/cmo.png",
      bio: `- 3 years leading marketing teams within the crypto space 
- Experience running bounty campaigns,
blogging, seo content writing, press release copy, 
community building, social media, geurila marketing, 
ppc, wide network of contacts, 
including exchange listing and press contacts`,
      link: greyMeteor()
    },
    {
      position: `Director of Field Operations`,
      name: "Oliver Ades",
      image: "./images/director.png",
      bio: `- Worked for British Antarctic Research Survey. 
- Completed 6 month expedition to Antartica before working as a purity and isolation 
technician for Syngenta Crop Sciences, 
and as a freelance crop inspector for UK cereals. 
- Extensive experience in documentary film and media,
including video production and photography.`,
      link: greyMeteor()
    },
    {
      position: "Chief Solutions Architect ",
      name: "Jack Fenton",
      image: "./images/csa.png",
      bio: `- 10+ years experience with specialisms in web security, cloud computing, 
site reliability and containerisation. 
- Along with daytime toil at a selection of enterprise-level London tech firms
Jack likes to spend his spare time looking away from his screens 
and daydreaming about loopholes in the space time continuum.`,
      link: greyMeteor()
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
                {moreInfo === "Less" && <Fragment><span className="bio"> <hr width="100%" />
                  <ReactMarkdown>{el.bio}</ReactMarkdown>
                </span>
                  <span className="link">{el.link}</span></Fragment>
                }
                ` \n`
                <Button variant="info" onClick={() => setmoreInfo(moreInfo === "More" ? "Less" : "More")}>Read {moreInfo} </Button>
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
