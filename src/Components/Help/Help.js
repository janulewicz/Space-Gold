import { Col, Row } from "react-bootstrap";
import { FaWindowClose } from 'react-icons/fa';
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
  .question {
    font-family: Poppins;
    font-style: normal;
    font-size: 18px;
    line-height: 100%;
    color: #ffffff;
    padding: 10px;
  }
  .text {
    font-family: Poppins;
    font-style: normal;
    font-size: 14px;
    color: #ffffff;
    padding: 10px;
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
  question: `How much spacegold do I have?`,
  answer: `
  You have 5! But that's not good \n
  because everyone's dead.
  And your leg just broke.
  `,
},
{
  question: `Can I buy any legs?`,
  answer: `
  You can't! But no-one cares.
  Because everyone's dead.
  And your money is no good.
  `,
},
{
  question: `How much spacegold do I have?`,
  answer: `
  You have 5! But that's not good
  because everyone's dead.
  And your leg just broke.
  `,
},
{
  question: `Can I buy any legs?`,
  answer: `
  You can't! But no-one cares. \n
  Because everyone's dead.
  And your money is no good.
  `,
}]


function Faq() {

  return (
        <Row>
          {questions.map((el, i) => {
            return (
              <Col sm key={i}>
                <div key={el.question} className="question">{el.question}</div>
                <div key={el.answer} className="text">{el.answer}</div>
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
          <p className="title">HELP!!! &nbsp;
            <FaWindowClose size="0.5em" onClick={() => { viewHelp(false) }} /></p>
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
