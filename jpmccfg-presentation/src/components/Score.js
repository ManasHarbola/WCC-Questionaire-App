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
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";



const Score = (props) => {
  let taglist = [];
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    useEffect(() => {
      const t = query(collection(db, "tags"));
      onSnapshot(t, (tags) => {
        taglist.push(tags.docs.map((x) => x.data()));
      });
    }, []);
  
  return (
    <Container onSubmit={(e) => {e.preventDefault(); window.location.href = "https://www.facebook.com/WomenCreatingChangeNY/"}}>
      <Benefit>Your score is</Benefit>
      <br/>
      <p style={{fontSize:140}}>{cookies.score}</p>
      <br/>
      <br/>
      <Benefit>You may find benefit working on</Benefit>
      <div style={{display:"flex"}}>
        <FormContent>
            <Label>{cookies.tags[0].tagName.charAt(0).toUpperCase() + cookies.tags[0].tagName.slice(1)}</Label>
            <Textarea
              disabled
              rows="4"
              id="tag_body"
              name="tag_body"
              placeholder="Black Women's Blueprint is a non-profit group centered on empowering Black women and girls in Black communities."
            />
            <Button onClick={(e) => {e.preventDefault(); window.location.href = "https://www.facebook.com/WomenCreatingChangeNY/"}}>Resources</Button>
        </FormContent>
        <FormContent>
            <Label>{cookies.tags[1].tagName.charAt(0).toUpperCase() + cookies.tags[1].tagName.slice(1)}</Label>
            <Textarea
              disabled
              rows="4"
              id="tag_body"
              name="tag_body"
              placeholder="Equal Justice Initiative is a non-profit group committed to ending mass incarceration and excessive punishment in the United States."
            />
            <Button onClick={(e) => {e.preventDefault(); window.location.href = "https://www.facebook.com/WomenCreatingChangeNY/"}}>Get Involved</Button>
        </FormContent>
        <FormContent>
            <Label>{cookies.tags[2].tagName.charAt(0).toUpperCase() + cookies.tags[2].tagName.slice(1)}</Label>
            <Textarea
              disabled
              rows="4"
              id="tag_body"
              name="tag_body"
              placeholder="NYC Black Women's Political Club advocated greater participation of Black women in all phases of the political process."
            />
            <Button onClick={(e) => {e.preventDefault(); window.location.href = "https://www.facebook.com/WomenCreatingChangeNY/"}}>Learn More</Button>
        </FormContent>
      </div>
      <Share
        className="button"
        id="submit"
        type="submit"
        value="Share"
      />
    </Container>
  );
};

const Benefit = styled.p`
  font-weight: bold;
  font-size: 25px;
`;

const Share = styled.input`
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

const Container = styled.form`
  padding: 1px;
  line-height: 55px;
`;

const Button = styled.button`
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
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

const FormContent = styled.form`
  border-radius: 5px;
  padding: 40px;
  max-width: 20vw;
  margin: 15px auto;
  background-color: rgba(230, 188, 59, 0.5);
`;

const Label = styled.label`
  color:"blue";
  font-weight: bold;
`;
export default Score;