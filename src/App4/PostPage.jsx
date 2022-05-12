import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/dataContext";
import api from "../api/posts.js";
const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() == id);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postLists = posts.filter((ele) => ele.id != id);
      setPosts(postLists);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/editpost/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p className="postDate">Well Done !</p>
            <Link to="/">Visit Our Home Page</Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
