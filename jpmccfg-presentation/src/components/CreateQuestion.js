import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "./utils/firebase.config";
import {
  query,
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

const CreateQuestion = (props) => {
  // State
  const [tags, setTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState("");
  const [questionValue, setQuestionValue] = useState("");
  const [tagSelections, setTagSelections] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tags"));
    const unsub = onSnapshot(q, (tag) => {
      setTags(
        tag.docs.map((doc) => doc.id),
        {}
      );
    });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    const newQuestionData = {
      answers: [1, 2, 3, 4, 5],
      in_use: true,
      question_body: questionValue,
      tags: tagSelections,
    };

    const docRef = await addDoc(collection(db, "questions"), newQuestionData);

    // create new tag, if applicable
    if (newTagValue) {
      await setDoc(doc(db, "tags", newTagValue), {});
    }

    setNewTagValue("");
    setQuestionValue("");
    setTagSelections([]);
  }

  function newTagChange(event) {
    setNewTagValue(event.target.value);
  }

  function questionChange(event) {
    setQuestionValue(event.target.value);
  }

  function tagSelectionChange(event) {
    var selected = [];
    for (var option of event.target) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setTagSelections(selected);
  }

  return (
    <Container>
      <FormContent>
        <Form>
          <Label>Question Name</Label>
          <Textarea
            onChange={questionChange}
            rows="4"
            id="question_body"
            name="question_body"
            placeholder="Are you.."
          />
          <Label>Select Question Tags</Label>
          <Selection onChange={tagSelectionChange} multiple>
            {tags.map((tag, i) => (
              <option key={i} value={tag}>
                {tag}
              </option>
            ))}
          </Selection>
          <Label>Create New Tag (optional) </Label>
          <Input
            onChange={newTagChange}
            value={newTagValue}
            placeholder="Create new tag..."
          />
          <Button onClick={onSubmit}>Submit</Button>
        </Form>
      </FormContent>
    </Container>
  );
};

const Button = styled.button`
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;
const Container = styled.div`
  width: 100vw;
  height 100vh;
`;

const Selection = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const FormContent = styled.div`
  border-radius: 5px;

  padding: 40px;
  max-width: 70vw;
  margin: 15px auto;
  background-color: rgba(130, 88, 159, 0.5);
`;

const Form = styled.form``;

const Label = styled.label``;

export default CreateQuestion;
