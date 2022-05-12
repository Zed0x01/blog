import React from "react";
import Header from "./App4/Header";
import Nav from "./App4/Nav";
import Footer from "./App4/Footer";
import Home from "./App4/Home";
import PostPage from "./App4/PostPage";
import EditPost from "./App4/EditPost";
import NewPost from "./App4/NewPost";
import About from "./App4/About";
import Missing from "./App4/Missing";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataContext";

const App4 = () => {
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
};

export default App4;
