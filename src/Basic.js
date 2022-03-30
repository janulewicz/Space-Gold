import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div``;
const Basic = () => {
  return (
    <Wrapper>
      <Col xs={11} md={10} xl={9} xxl={8} className="mx-auto"></Col>
    </Wrapper>
  );
};
export default Basic;
