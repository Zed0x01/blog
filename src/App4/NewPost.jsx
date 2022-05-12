import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import { format } from "date-fns";
import api from "../api/posts.js";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy PP");
    const post = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", post);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      Navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="PostTitle">Title:</label>
        <input
          type="text"
          id="postTItle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <input
          id="postBody"
          type="text"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
