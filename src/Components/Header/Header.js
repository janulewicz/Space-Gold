import React, { useState } from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  background: #17120f;
  z-index: 5;
  .menuItem {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;

    text-transform: uppercase;
    color: #2fd4e7;
    text-decoration: none;
    cursor: pointer;
  }
  .button {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    color: #ffffff;
    outline: 0;
    border: 0;
    border-radius: 8px;
    padding: 10px;
    margin-left: 18px;
    background: #f99c00;
  }
  .hamburger {
    cursor: pointer;
  }

  .sidebar {
    padding: 25px 0;
    padding-top: 0;
    position: absolute;
    top: 100px;
    left: 0;
    background: #17120f;
    width: 100%;
    transition: 1s;
  }
`;

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const menus = [
    { name: "HOME", to: "HeroSection"},
    { name: "Roadmap", to: "roadmap" },
    { name: "Litepaper", to: "/litepaper-21-05-2022.pdf" , pdf :true},
    { name: "Whitepaper", to: "/whitepaper-21-05-2022.pdf" , pdf :true},
  ];

  return (
    <Wrapper>
      <Col
        xs={11}
        xxl={10}
        className="mx-auto d-flex justify-content-between align-items-center"
      >
        <img src="./images/logo.png" alt="#" />
        <div className="d-none d-lg-flex align-items-center ">
          {menus.map((el, i) => {
              if(el.pdf)
              {
                return <a key={i} href={el.to} className="menuItem px-3" target='_blank' rel='noopener noreferrer'>{el.name}</a>
              }
              else
              {
                return <Link
                to={el.to}
                spy={true}
                smooth={true}
                offset={-150}
                duration={250}
                activeClass="active"
                className="menuItem px-3"
                key={i} >
                {el.name}
              </Link>
              }
            })}
          <button className="button">Connect Wallet</button>
        </div>
        <div
          className="hamburger d-flex d-lg-none"
          onClick={() => setSidebar((prev) => !prev)}
        >
          {sidebar ? (
            <IoMdClose color="#fff" size="30" />
          ) : (
            <GiHamburgerMenu color="#fff" size="30" />
          )}
        </div>

        {sidebar && (
          <div
            className={
              "sidebar d-flex  d-lg-none align-items-center  flex-column justify-content-center "
            }
          >
            {menus.map((el, i) => {
              if(el.pdf)
              {
                return <a key={i} href={el.to} className="menuItem px-3 py-3" target='_blank' rel='noopener noreferrer'>{el.name}</a>
              }
              else
              {
                return <Link
                to={el.to}
                spy={true}
                smooth={true}
                offset={-150}
                duration={250}
                activeClass="active"
                className="menuItem px-3 py-3"
                key={i} >
                {el.name}
              </Link>
              }
            })}

            <button className="button my-3">Connect Wallet</button>
          </div>
        )}
      </Col>
    </Wrapper>
  );
};
export default Header;
