import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { db } from "./utils/firebase.config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const Home = (props) => {
  // *State
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tags"), orderBy("average_score", "asc"));
    console.log(q);
    const unsub = onSnapshot(q, (tag) => {
      setTags(tag.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    console.log("tags:", tags);
  }, []);
  return (
    <Container>
      <StatContent>
        <TableContainer>
          <BarChart width={590} height={200} data={tags.slice(-6)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="average_score" fill="#82ca9d" />
          </BarChart>
          <SeeMore>See More</SeeMore>
        </TableContainer>
      </StatContent>
      <Actions>
        <AddQuestion href="/create">Add a question!</AddQuestion>
        <AddSuggestion href="/suggestion">Give Advice!</AddSuggestion>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 200px;
  margin-top: 50px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;

  padding: 25px;
  margin-top: 110px;
  max-width: 90vw;

  justify-content: center;
  align-items: center;
`;

const AddQuestion = styled.a`
  cursor: pointer;
  flex: 1;
  text-decoration: none;
  padding: 11px;
  border-radius: 8px;
  color: rgba(95, 39, 205, 1);
  color: #f5f5f5;
  font-weight: 600;
  letter-spacing: 1.5px;
  background-color: rgba(95, 39, 205, 0.7);
  margin-right: 25px;
  transition: all 0.2s ease 0s;
  opacity: 1;
  &:hover {
    opacity: 0.7;
  }
`;

const AddSuggestion = styled.a`
  pointer: cursor;
  flex: 1;
  text-decoration: none;
  padding: 11px;
  border-radius: 8px;
  color: rgba(52, 31, 151, 1);
  color: #f5f5f5;
  font-weight: 600;
  letter-spacing: 1.5px;
  background-color: rgba(52, 31, 151, 0.7);
  margin-right: 25px;
  opacity: 1;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.6;
  }
`;

const SeeMore = styled.a`
  text-decoration: none;
  color: #f4f4f4;
  letter-spacing: 1.5px;
  padding: 15px;
  margin-top: 15px;
  border: 1px solid #88619a;
  background-color: #88619a;
  border-radius: 5px;
`;

export default Home;
