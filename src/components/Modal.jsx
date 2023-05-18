import React from "react";
import { styled } from "styled-components";
import { LoginBtn } from "./styled-component/login/login";
import { useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import axios from "axios";

const ModalBackgroundDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 15%;
  right: 37.5%;
  border-radius: 5px;
  padding: 10px;
  width: 25%;
  height: 70%;
  background-color: white;
  gap: 5px;
  overflow: auto;
`;

const AssignLabel = styled.label`
  font-weight: bolder;
  font-size: 12px;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ConfirmLabel = styled.label`
  font-size: 12px;
  color: ${(props) => {
    if (props.name === "id") {
      return props.checkvalue.id === "" ? "red" : null;
    } else if (props.name === "pw") {
      return props.checkvalue.pw === "" ? "red" : null;
    } else {
      return props.checkvalue.confirm === "" ||
        props.checkvalue.pw !== props.checkvalue.confirm
        ? "red"
        : null;
    }
  }};
  display: ${(props) => {
    if (props.name === "id") {
      return props.$needdetail ? null : "none";
    } else if (props.name === "pw") {
      return props.$needdetail ? null : "none";
    } else {
      return props.$needdetail &&
        props.checkvalue.pw !== props.checkvalue.confirm
        ? null
        : "none";
    }
  }};
`;

const InputTag = styled.input`
  display: inline-block;
  border: none;
  height: 100%;
  width: 70%;
  &:focus {
    outline: none;
  }
`;

const InputDiv = styled.div`
  border: 1px solid rgb(218, 218, 218);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 10px;
`;

function Modal({ isOpen, closeModal }) {
  const [user, setUser] = useState({
    id: "",
    pw: "",
    confirm: "",
  });
  const [needDetail, setNeedDetail] = useState({
    id: false,
    pw: false,
    confirm: false,
  });

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const showDetail = ({ target }) => {
    const { name } = target;
    setNeedDetail({ ...needDetail, [name]: true });
  };

  const sendData = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/register", {
        email: user.id + "@naver.com",
        password: user.pw,
      });
      console.log("data", data);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.log("error", error);
    }

    setUser({
      id: "",
      pw: "",
      confirm: "",
    });
    setNeedDetail({
      id: false,
      pw: false,
      confirm: false,
    });
  };

  const style = user.pw === user.confirm ? null : { color: "red" };

  return isOpen ? (
    <ModalBackgroundDiv>
      <ModalBox>
        <ModalDiv>
          <AssignLabel>아이디</AssignLabel>
          <InputDiv name="id" onClick={showDetail}>
            <InputTag
              maxLength="20"
              onChange={inputChangeHandler}
              name="id"
              value={user.id}
            />
            <label>@naver.com</label>
          </InputDiv>
          <ConfirmLabel name="id" checkvalue={user} $needdetail={needDetail.id}>
            필수 정보입니다.
          </ConfirmLabel>
        </ModalDiv>
        <ModalDiv>
          <AssignLabel>비밀번호</AssignLabel>
          <InputDiv name="pw" onClick={showDetail}>
            <InputTag
              maxLength="20"
              onChange={inputChangeHandler}
              name="pw"
              value={user.pw}
              type="password"
            />
            <div></div>
          </InputDiv>
          <ConfirmLabel name="pw" checkvalue={user} $needdetail={needDetail.pw}>
            필수 정보입니다.
          </ConfirmLabel>
        </ModalDiv>
        <ModalDiv>
          <AssignLabel>비밀번호재확인</AssignLabel>
          <InputDiv name="confirm" onClick={showDetail}>
            <InputTag
              maxLength="20"
              onChange={inputChangeHandler}
              name="confirm"
              value={user.confirm}
              type="password"
              style={{
                border: "none",
              }}
            />
            <div style={style}>
              <BsFillBagCheckFill />
            </div>
          </InputDiv>
          <ConfirmLabel
            name="confirm"
            checkvalue={user}
            $needdetail={needDetail.confirm}
          >
            비밀번호가 다릅니다.
          </ConfirmLabel>
        </ModalDiv>
        <LoginBtn
          onClick={() => {
            if (user.pw === "" || user.pw !== user.confirm) {
              return alert("비밀번호를 재확인하세요!");
            }
            closeModal();
            sendData();
          }}
        >
          회원가입
        </LoginBtn>
      </ModalBox>
    </ModalBackgroundDiv>
  ) : null;
}

export default Modal;
