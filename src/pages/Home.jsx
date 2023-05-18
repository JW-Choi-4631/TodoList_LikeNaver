import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  LoginBox,
  LoginInput,
  LoginBtn,
} from "../components/styled-component/login/login";
import axios from "axios";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useCookies } from "react-cookie";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 1000px;
  gap: 2.5%;
`;

const StyledBtn = styled.div`
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(3, 199, 90);
  color: white;
  font-weight: 500;
`;

function Home() {
  const [contents, setContents] = useState({
    title: "",
    content: "",
    date: "",
    isDone: false,
  });

  const [user, setUser] = useState({
    id: "",
    pw: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return state.todos;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const postTodos = async () => {
    if (contents.title === "") {
      alert("제목을 입력하세요!");
      return null;
    }

    if (contents.content === "") {
      alert("내용을 입력하세요!");
      return null;
    }

    if (contents.date === "") {
      alert("기한을 입력하세요!");
      return null;
    }

    await axios.post("http://localhost:8000/todos", contents);
    dispatch(__getTodos());
    setContents({
      title: "",
      content: "",
      date: "",
      isDone: false,
    });
  };

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setContents({
      ...contents,
      [name]: value,
    });
  };

  const userChangeHandler = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    dispatch(__getTodos());
  };

  const completeTodo = async (todo) => {
    await axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      ...todo,
      isDone: true,
    });
    dispatch(__getTodos());
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [cookies, setCookie, removeCookie] = useCookies();

  const logIn = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/login", {
        email: user.id + "@naver.com",
        password: user.pw,
      });
      console.log("data", data);
      setCookie("accessToken", data["accessToken"], { path: "/" });
      alert("로그인에 성공했습니다.");
      console.log("cookies", cookies);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const style = cookies.accesToken.length > 0 ? { display: "none" } : null;

  return (
    <div
      style={{
        width: "100%",
        margin: "0px auto",
      }}
    >
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0px",
        }}
      >
        <LoginBox>
          <LoginInput
            name="id"
            onChange={userChangeHandler}
            value={user.id}
            placeholder="아이디"
          />
          <LoginInput
            name="pw"
            onChange={userChangeHandler}
            value={user.pw}
            type="password"
            placeholder="비밀번호"
          />
          <button
            style={{
              backgroundColor: "white",
              width: "fit-content",
              border: "none",
              fontSize: "7px",
              margin: "5px 0 0 auto",
            }}
            onClick={openModal}
          >
            회원가입
          </button>
          <LoginBtn onClick={logIn}>로그인</LoginBtn>
        </LoginBox>
        <InputBox>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              name="title"
              onChange={inputChangeHandler}
              type="text"
              placeholder="제목을 입력하세요"
              value={contents.title}
              style={{
                width: "60%",
              }}
            />
            <div>
              <label>최종완료 예정일 : </label>
              <input
                name="date"
                onChange={inputChangeHandler}
                type="date"
                value={contents.date}
              />
            </div>
          </div>
          <textarea
            name="content"
            onChange={inputChangeHandler}
            type="text"
            placeholder="내용을 입력하세요"
            value={contents.content}
            rows="3"
            style={{
              resize: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <StyledBtn onClick={() => navigate("/complete")}>
              Go Complete Page
            </StyledBtn>
            <StyledBtn onClick={postTodos}>저장</StyledBtn>
          </div>
        </InputBox>
      </div>
      <FlexBox>
        {todos.todos.map((todo) => {
          if (!todo.isDone) {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            );
          } else {
            return null;
          }
        })}
      </FlexBox>
    </div>
  );
}

export default Home;
