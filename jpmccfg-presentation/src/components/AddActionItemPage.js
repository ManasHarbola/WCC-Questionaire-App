import React, { useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { db } from "./utils/firebase.config";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";

const formValues = {
  selectedTag: "selectedTag",
  actionDescription: "actionDescription",
  actionUrl: "actionUrl",
};

const reducer = (state, action) => {
  switch (action.type) {
    case formValues.selectedTag:
      return { ...state, selectedTag: action.value };
    case formValues.actionDescription:
      return { ...state, actionDescription: action.value };
    case formValues.actionUrl:
      return { ...state, actionUrl: action.value };
  }
};

const init = {
  selectedTag: "",
  actionDescription: "",
  actionUrl: "",
};

const AddActionItemPage = (props) => {
  const [state, dispatch] = useReducer(reducer, init);
  const [tags, setTags] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const docRef = doc(db, "tags", state.selectedTag);
    await updateDoc(docRef, {
      link_description: arrayUnion(state.AddActionItemPage),
      links: arrayUnion(state.actionUrl),
    });
  }

  useEffect(() => {
    const q = query(collection(db, "tags"));
    const unsub = onSnapshot(q, (tag) => {
      setTags(
        tag.docs.map((doc) => doc.id),
        {}
      );
    });
  }, []);
  return (
    <Container>
      <FormContent>
        <Form>
          <Label>Select a Tag</Label>
          <Selection
            value={state.selectedTag}
            onChange={(event) => {
              dispatch({
                type: formValues.selectedTag,
                value: event.target.value,
              });
            }}
          >
            {tags.map((tag, i) => (
              <option key={i} value={tag}>
                {tag}
              </option>
            ))}
          </Selection>
          <Label>Write a good, actionable advice!</Label>
          <Textarea
            value={state.actionDescription}
            onChange={(event) => {
              dispatch({
                type: formValues.actionDescription,
                value: event.target.value,
              });
            }}
            rows="4"
            id="question_body"
            name="question_body"
            placeholder="For people who scored low on this section, what would you like them to know most.."
          />
          <Label>Add a URL? (optional)</Label>
          <Input
            onChange={(event) => {
              dispatch({
                type: formValues.actionUrl,
                value: event.target.value,
              });
            }}
            value={state.actionUrl}
            placeholder="Create new tag..."
          />

          <Button>Submit</Button>
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

export default AddActionItemPage;
