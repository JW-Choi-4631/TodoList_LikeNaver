import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Complete from "../pages/Complete";
import Detail from "../pages/Detail";
import { styled } from "styled-components";

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const AppBox = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  height: 95vh;
`;

function Router() {
  return (
    <BrowserRouter>
      <AppBox>
        <header>
          <FlexBox>
            <h1>Mini TodoList</h1>
          </FlexBox>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/complete" element={<Complete />} />
        </Routes>
        <footer>
          <Routes>
            <Route
              path="/"
              element={
                <FlexBox>
                  <h3>Home Page</h3>
                </FlexBox>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <FlexBox>
                  <h3>Detail Page</h3>
                </FlexBox>
              }
            />
            <Route
              path="/complete"
              element={
                <FlexBox>
                  <h3>Complete Page</h3>
                </FlexBox>
              }
            />
          </Routes>
        </footer>
      </AppBox>
    </BrowserRouter>
  );
}

export default Router;
