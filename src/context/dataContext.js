import { createContext, useState, useEffect } from "react";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      search !== undefined
        ? post.title.toLowerCase().includes(search.toLowerCase())
        : posts
    );
    setSearchResult(filtered);
  }, [search, posts]);

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
