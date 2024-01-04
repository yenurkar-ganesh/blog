import { useEffect, useState } from "react";
import Post from "../Post/post.jsx";
import Header from "../header/header.jsx";
import { FaAngleDoubleRight } from "react-icons/fa";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/api/blogs")
      .then((response) => response.json())
      .then((blogs) => {
        setBlogs(blogs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <main className="mainHome">
      <Header />
      <p>
        ALL BLOGS <FaAngleDoubleRight />{" "}
      </p>
      <section className="blogSection">
        {blogs.length > 0 &&
          blogs.map((blog, id) => <Post key={id} {...blog} />)}
      </section>
    </main>
  );
};

export default Homepage;
