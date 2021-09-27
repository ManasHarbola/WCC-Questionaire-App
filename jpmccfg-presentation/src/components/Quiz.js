import styled, { ThemeConsumer } from "styled-components";
import { db } from "./utils/firebase.config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import QuizCard from "./QuizCard";
import React from "react";
import { useEffect, useState } from "react";
import { calculate_scores } from "./utils/score_calculate";
import { rank_all_tags, get_k_lowest_tags } from "./utils/rank_scores";
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router";
import { MdColorLens } from "react-icons/md";

const Quiz = (props) => {

  const [active, setActive] = React.useState({});

  const [question_answers, setTagScores] = React.useState({});

  const [cookies, setCookie] = useCookies(['score','tags']);

  const calc = (e) => {
    e.preventDefault();
    let sum = 0;
    for (let key in active) {
      sum += active[key];
    }
    setCookie("score", sum);
    let calculated_scores = calculate_scores(question_answers);
    // console.log(calculated_scores)
    let tags = calculated_scores["tag_scores"];
    // console.log(tags);
    let lowest_tags = get_k_lowest_tags(tags, 3);
    
    // console.log(lowest_tags);
    setCookie("tags", lowest_tags);
    window.location.href = "../score";
  };

  const selection = (question, tags, value) => {
    let temp = active;
    temp[question] = value;
    setActive(temp);

    let answers = question_answers;
    answers[question] = {
      "point_value" : value, "max_value" : 5,
      "tags" : tags};
    setTagScores(answers);
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsub = onSnapshot(q, (question) => {
      setQuestions(question.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <Container onSubmit={calc}>
      {
      questions.map((question, i) => {

        if(question.in_use == true){
          
        return <QuizCard
          {...question}
          key={question.id}
          i={i}
          selection={selection}
        />
      }
      return;
      })
      }
      <SubmitButton
        className="button"
        id="submit"
        type="submit"
        value="Calculate My Score!"
      />
      <ResetButton
        className="button"
        id="reset"
        type="reset"
        value="Clear Quiz."
      />
    </Container>
  );
};


const SubmitButton = styled.input`
  font-weight: bold;
  text-decoration: none;
  background-color: rgba(38, 161, 62, .8);
  max-width: 200px;
  width: 100%;
  letter-spacing: 1px;
  font-size: 15px;
  padding: 15px 0;
  border: 2px solid transparent;
  border-radius: 15px;
  margin: 20px;

  &:hover {
    background-color: rgba(38, 161, 62, 1);
  }
`;

const ResetButton = styled.input`
  font-weight: bold;
  text-decoration: none;
  background-color: rgba(180, 19, 19, .7);
  max-width: 200px;
  width: 100%;
  letter-spacing: 1px;
  font-size: 15px;
  padding: 15px 0;
  border: 2px solid transparent;
  border-radius: 15px;
  margin: 20px;

  &:hover {
    background-color: rgba(180, 19, 19, 1);
  }
`;

const Container = styled.form`
  padding: 1px;
  line-height: 55px;
`;

export default Quiz;
