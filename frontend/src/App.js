import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </>
  );
};

export default App;
