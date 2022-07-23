import { Col, Row } from "react-bootstrap";
import { FaWindowClose, FaAngleUp } from 'react-icons/fa';
import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 25px 0;
  .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 72px;
    color: #2fd4e7;
  }
  .right {
    float: right;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 72px;
    color: #2fd4e7;
  }
  .question {
    font-family: Poppins;
    font-style: normal;
    font-size: 18px;
    line-height: 100%;
    color: #ffffff;
    padding: 10px 0px 15px 0px;
  }
  .text {
    font-family: Poppins;
    font-style: normal;
    font-size: 14px;
    color: #ffffff;
    padding: 0px 0px 15px 0px;
    white-space: pre-line;
  }
  .link {
    font-size: 16px;
    color: #2fd4e7;
  }
  .icon {
    padding: 13px;
  }
  .image {
    width: 100%;
  }
  .overlay {
    background: rgba(0, 0, 0, 1);
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
  }
`;

const questions = [{
  question: `How do I invest?`,
  answer: `
  Send Binance USD (BUSD) to our private sale wallet and complete the investors form.
  Investing direct from the website will be available soon.
  It's good to have some BNB left to pay gas fees!
  `,
  link: true,
  url: "https://docs.google.com/forms/d/13FXdcAD4SAFY2eNNNvK_FeTQg44ng2RPjUyCp7To-Q4",
  link_text: "PRIVATE SALE FORM"
},
{
  question: `What happens to my money?`,
  answer: `
  Your money is sent to our secure cold storage wallet.
  It will be used for profit making activities around meteorite hunting.
  Some of the funds maybe used for marketing, 
  for example for us to speak at the Malta Blockchain and AI summit.
  `,
},
{
  question: `When do I get dividends?`,
  answer: `
  Dividends will be paid after the Christie's auction in Q1 2023,
  and every year anually after that.
  `,
},
{
  question: `Can I get my money back?`,
  answer: `
  Private sale investments are locked until the private sale completes.
  In certain circumstances we will refund an investor if in a time of need, at our discretion.
  `,
},
{
  question: `When do I get my shiny new tokens?`,
  answer: `
  January 2023 is the scheduled airdrop.
  `,
},
{
  question: `What blockchain does SpaceGold use?`,
  answer: `
  Binance Smart Chain.
  Dividends will be issued on the Liquid BTC network.,
  `,
  link: true,
  url: "https://spacegoldcoin.io/whitepaper-21-05-2022.pdf",
  link_text: "WHITEPAPER"
},
{
  question: `Which wallets does SpaceGold support?`,
  answer: `
  The SpaceGold website currently supports MetaMask, at this time.
  More wallets and compatibilites will feature as the project progresses.
  `,
},
{
  question: `Why doesn't SpaceGold work on my device?`,
  answer: `
  Please contact us regarding any technical issues and we will help.
  More documentation will be added as the project progresses.
  `,
},
{
  question: `How do I apply to join the team? / I want to mine SpaceGold!`,
  answer: `
  Please complete our service providers application form
  and join our telegram and twitter communities.
  `,
  link: true,
  url: "https://twitter.com/spacegoldcoin?t=EhwAUeZZ9u3QqxNFLzSuuw&s=091",
  link_text: "TWITTER"
},
{
  question: `I have another question!`,
  answer: `
  Please join our telegram and twitter communities :)
  `,
  link: true,
  url: "https://t.me/SpaceGold1",
  link_text: "TELEGRAM"
}
]

function Faq() {

  return (
    <Row>
      {questions.map((el, i) => {
        return (
          <Col sm="3" md="3" lg="3" xl="3" xxl="3" key={i}>
            <div key={el.question} className="question">
              <hr width="100%" />
              • {el.question}</div>
            <div key={el.answer} className="text">{el.answer}</div>
            {el.link && <div key={el.link} className="link" onClick={() => window.open(el.url)}>
              {el.link_text}
            </div>}
          </Col>
        )
      })}
    </Row>
  );
}

const Help = ({ help, viewHelp }) => {
  if (help) {
    return (
      <Wrapper id="Help">
        <Col xs={11} xxl={10} className="mx-auto">a
          <div className="title">HELP!!! &nbsp;
            <FaWindowClose size="0.7em" onClick={() => { viewHelp(false) }} />
            <div className="right"><FaAngleUp size="0.7em" onClick={() => { viewHelp(false) }} /></div>
          </div>
          <Row>
          </Row>
          <Faq />
        </Col>
        <div className="overlay"></div>
      </Wrapper>
    )
  }
  else return (
    <Wrapper id="Help">
      <div className="overlay"></div>
    </Wrapper>
  )
};
export default Help;
