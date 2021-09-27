import styled from "styled-components";
import React from "react";

const QuizCard = (props) => {
  return (
  <div>
    <Question>{props.question_body}</Question>
    <Radio>
      <Disagree>Disagree</Disagree>
      <input type="radio" name={props.question_body} value={String(props.answers[0])} style={{height:55, width:65}} onClick={()=>props.selection(props.question_body, props.tags, props.answers[0])}/>
      <input type="radio" name={props.question_body} value={String(props.answers[1])} style={{height:45, width:55}} onClick={()=>props.selection(props.question_body, props.tags, props.answers[1])}/>
      <input type="radio" name={props.question_body} value={String(props.answers[2])} style={{height:40, width:50}} onClick={()=>props.selection(props.question_body, props.tags, props.answers[2])}/>
      <input type="radio" name={props.question_body} value={String(props.answers[3])} style={{height:45, width:55}} onClick={()=>props.selection(props.question_body, props.tags, props.answers[3])}/>
      <input type="radio" name={props.question_body} value={String(props.answers[4])} style={{height:55, width:65}} onClick={()=>props.selection(props.question_body, props.tags, props.answers[4])}/>
      <Agree>Agree</Agree>
    </Radio>
    <SepLine></SepLine>
  </div>
  );
};

const SepLine = styled.hr`
  margin: 10px auto;
  width: 80%;
  border-top: 2.5px solid #A170B7;
`;

const Question = styled.p`
  color: #51596a;
  font-weight: bold;
  font-size: 30px;
`;

const Disagree = styled.p`
  color: #88619a;
  font-weight: bold;
  font-size: 20px;
  margin: 12px;
  padding: 2px;
`;

const Agree = styled.p`
  color: #33a474;
  font-weight: bold;
  font-size: 20px;
  margin: 12px;
  padding: 12px;
`;

const Radio = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default QuizCard;
