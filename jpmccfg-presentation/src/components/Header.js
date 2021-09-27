import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { useLocation, useHistory } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [showModal, history]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const logOut = () => {
    setLoggedIn(false);
    history.push("/");
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/WCC_Logo.jpg" />
        </a>
        <div>
          <LogIn onClick={!loggedIn ? openModal : logOut}>
            {loggedIn ? "Log Out" : "Log In"}
          </LogIn>
          <TakeTest href="/quiz">Take the Test</TakeTest>
        </div>
      </Nav>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
  margin: 0;
`;

const Nav = styled.div`
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
  position: fixed;
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    text-decoration: none;
    letter-spacing: 2px;
    color: #88619a;
    font-weight: 600;
    @media (max-width: 768px) {
      padding: 0 5px;
    }

    img {
      object-fit: contain;
      max-width: 100px;
      width: 100%;
    }
  }
`;

// *LogIn
const LogIn = styled.a`
  cursor: pointer;
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin-right: 12px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

// *TakeTest
const TakeTest = styled.a`
  box-shadow: inset 0 0 0 1px #88619a;
  color: #88619a;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 1.5px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #88619a;
    text-decoration: none;
  }
  & > a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Header;
