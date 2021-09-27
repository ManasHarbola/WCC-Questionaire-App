import styled from "styled-components";
import { db } from "./utils/firebase.config";
import { collection, getDocs } from "firebase/firestore";

// Styles motivated by Clever Programmer. Check him out
const Login = (props) => {
  return (
    <Container>
      <Content>
        <Action>
          <ActionLogoOne
            src="/images/happy-inclusion.png"
            alt="women for change, new vision"
          />
          <TakeTest href="/quiz">TAKE THE TEST</TakeTest>
          <Description>
            Women Creating Change envisions a more just and equitable New York
            City where all women are civically engaged. Find out where you stand
            by taking this quiz! Make an impact!
          </Description>
        </Action>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const Action = styled.div`
  margin-bottom: 2vw;
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

const ActionLogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const TakeTest = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #88619a;
  text-decoration: none;
  margin-bottom: 12px;
  max-width: 600px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 17px 0;
  border: 2px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #886aaa;
  }
`;

const Description = styled.p`
  color: #2e2b36;
  font-weight: bold;
  font-size: 15px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

export default Login;
