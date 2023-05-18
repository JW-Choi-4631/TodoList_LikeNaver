import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "../redux/modules/todos";

const TotalBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 100vh;
  margin: 30px auto;
  padding: 10px;
  max-width: 1200px;
  max-height: 700px;
`;

const ChangeBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 40%;
  height: 50%;
  border: none;
  background-color: rgb(247, 249, 250);
`;

const DetailTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: absolute;
  top: 40px;
`;

const HomeBtn = styled.button`
  position: absolute;
  bottom: 80px;
  font-size: 40px;
  border-radius: 5px;
  border: none;
  padding: 10px;
`;

function Detail() {
  const [contents, setContents] = useState({
    title: "",
    content: "",
    date: "",
    isDone: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const params = useParams();
  const todo = todos.todos.find((todo) => todo.id.toString() === params.id);

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setContents({
      ...contents,
      [name]: value,
    });
  };

  const ChangeTodoBtnClickHandler = async () => {
    await axios.patch(`http://localhost:8000/todos/${params.id}`, contents);
    dispatch(__getTodos());
    navigate("/");
  };

  if (todos.isLoading) {
    return <div>Loading중...</div>;
  }

  return (
    <TotalBox>
      <DetailTitle>
        <h3>Change Todo</h3>
        <h4>id:{params.id}</h4>
      </DetailTitle>
      <HomeBtn
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </HomeBtn>
      <ChangeBox>
        <p>제목 : {todo.title}</p>
        <p>내용 : {todo.content}</p>
        <p>날짜 : {todo.date}</p>
      </ChangeBox>
      <div>⟹</div>
      <ChangeBox>
        <p>
          제목 : <input name="title" onChange={inputChangeHandler} />
        </p>
        <p>
          내용 : <input name="content" onChange={inputChangeHandler} />
        </p>
        <p>
          날짜 : <input name="date" onChange={inputChangeHandler} type="date" />
        </p>
        <button
          onClick={ChangeTodoBtnClickHandler}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          수정하기
        </button>
      </ChangeBox>
    </TotalBox>
  );
}

export default Detail;
