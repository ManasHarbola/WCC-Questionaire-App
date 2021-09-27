import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { db } from "./utils/firebase.config";
import { useHistory } from "react-router-dom";
import { query, collection, onSnapshot } from "firebase/firestore";

const Modal = ({ showModal, setShowModal }) => {
  const history = useHistory();

  // *STATE*
  const [password, setPassword] = useState("");
  const [serverPassword, setServerPassword] = useState("");

  // simple password logic. Extendible in the future
  useEffect(() => {
    const q = query(collection(db, "admin"));
    const unsub = onSnapshot(q, (adminDocument) => {
      // Most brute force ever: get's the job done. No time left.
      setServerPassword(adminDocument.docs[0]?.data().pwd);
    });
  }, []);

  const onJoinClick = (event) => {
    if (serverPassword === password) {
      console.log("history:", history);
      history.push("/home");
      setShowModal((prev) => !prev);
    }
  };

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={"/images/wcc-power.png"} alt="camera" />
              <ModalContent>
                <h1>Administration Key?</h1>
                <InputBox
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                />
                <button onClick={onJoinClick}>Join Now</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 1000;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    cursor: pointer;
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 1000;
`;
const InputBox = styled.input`
  margin: 10px 0;
  padding: 15px;
  border-radius: 13px;
  outline: none;
`;

export default Modal;
