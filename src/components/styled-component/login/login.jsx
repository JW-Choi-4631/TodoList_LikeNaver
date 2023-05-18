import { styled } from "styled-components";

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 15px;
`;

export const LoginBtn = styled.button`
  margin-top: 10px;
  background-color: rgb(3, 199, 90);
  color: white;
  border: none;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
`;

export const LoginInput = styled.input`
  border: 0.5px solid lightgrey;
  height: 30px;
`;
