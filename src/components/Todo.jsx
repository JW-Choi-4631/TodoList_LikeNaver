import React from "react";
import { TodoBox } from "./styled-component/todoList/todoList";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const TitleBox = styled.div`
  width: 90%;
  height: 20%;
  font-weight: bold;
  font-size: large;
  overflow: hidden;
`;

const ContentBox = styled.div`
  width: 100%;
  color: grey;
  height: 40%;
  font-size: small;
  overflow: auto;
`;

const DateBox = styled.div`
  width: 100%;
  color: grey;
  font-size: small;
  height: 10%;
`;

function Todo({ todo, deleteTodo, completeTodo }) {
  const { title, content, date, isDone, id } = todo;
  const navigate = useNavigate();

  let btnTitle = null;
  let boxStyle = null;

  const homeStyle = {
    width: "18%",
  };

  const completeStyle = {
    width: "100%",
  };

  const goToDetailBtnClickHandler = (id) => {
    navigate(`/detail/${id}`);
  };

  if (isDone) {
    btnTitle = "취소";
    boxStyle = completeStyle;
  } else {
    btnTitle = "완료";
    boxStyle = homeStyle;
  }

  return (
    <TodoBox style={boxStyle}>
      <TitleBox>{title}</TitleBox>
      <ContentBox>{content}</ContentBox>
      <DateBox>{date}</DateBox>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => {
            deleteTodo(id);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            completeTodo(todo);
          }}
        >
          {btnTitle}
        </button>
      </div>
      <button
        onClick={() => {
          goToDetailBtnClickHandler(id);
        }}
      >
        Go To Detail
      </button>
    </TodoBox>
  );
}

export default Todo;
