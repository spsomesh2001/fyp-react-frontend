import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MLPage } from "./components";
import { GlobalContainer } from "./GlobalContainer";
import "antd/dist/antd.css";

const App = () => {
  return (
    <>
      <Router>
        <GlobalContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/ml" />}></Route>
          <Route path="/ml" element={<MLPage />} exact></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
