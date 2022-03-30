import React, { useState } from "react";

import { Col } from "react-bootstrap";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-scroll";
import styled from "styled-components";
const Wrapper = styled.div`
  position: fixed;
  padding: 20px 0;
  width: 100%;
  background: #000;
  z-index: 10;
  .nav-item {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    /* identical to box height, or 18px */

    letter-spacing: 0.02em;

    color: #ffffff;
    margin-right: 35px;
    cursor: pointer;
  }
  .background {
    background: #000;
  }
  .sidebar {
    background: #000;
    padding: 25px 0;
  }
`;

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navArray = [
    { name: "Home", to: "hero" },
    { name: "About us", to: "about" },
    { name: "RoadMap", to: "roadmap" },
    { name: "Team", to: "team" },
    { name: "Faq", to: "faq" },
  ];

  return (
    <Wrapper>
      <Col xs={11} md={10} xl={9} xxl={8} className="mx-auto">
        <div className="d-flex justify-content-between align-items-center">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            activeClass="active"
            className="nav-item"
          >
            <img src="./images/logo.png" alt="Logo" className="logo" />
          </Link>
          <div className="d-none d-md-flex">
            {navArray.map((el, i) => (
              <Link
                to={el.to}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                activeClass="active"
                className="nav-item"
                key={i}
              >
                {el.name}
              </Link>
            ))}
          </div>
          {sidebar ? (
            <IoMdClose
              size={28}
              color="#fff"
              className="d-md-none"
              onClick={() => setSidebar((prev) => !prev)}
            />
          ) : (
            <GiHamburgerMenu
              size={28}
              color="#fff"
              className="d-md-none"
              onClick={() => setSidebar((prev) => !prev)}
            />
          )}
        </div>
        {sidebar && (
          <div className="sidebar d-flex flex-column justify-content-center align-items-center d-md-none">
            {navArray.map((el, i) => (
              <Link
                to={el.to}
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                activeClass="active"
                onClick={() => setSidebar(false)}
                className="nav-item my-4"
                key={i}
              >
                {el.name}
              </Link>
            ))}
          </div>
        )}
      </Col>
    </Wrapper>
  );
};
export default Navbar;
