import { useEffect, useState } from "react";
import Post from "../Post/post.jsx";
import Header from "../header/header.jsx";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <>
      <Header />
      <div className="overlay">
          <h1 className="overlayText">
            "Breaking Tech Barriers, One Byte at a Time."
          </h1>
        </div>
      <main className="mainHome">
        <section className="publishBlog">
          <h1 className="publishText">
            PUBLISH YOUR PASSIONS,{" "}
            <span style={{ color: "#FFA351" }}>YOUR WAY</span>
          </h1>
          <p className="publishInfo">
            Create a unique and beautiful{" "}
            <span style={{ color: "#FFA351" }}>BLOG</span> easily.
          </p>
          <Link className="publishBtn" to='/create'>CREATE YOUR BLOG</Link>
        </section>

        <p style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          ALL BLOGS <FaAngleDoubleRight />
        </p>
        <section className="blogSection">
          {blogs.length > 0 &&
            blogs.map((blog, id) => <Post key={id} {...blog} />)}
        </section>
      </main>
    </>
  );
};

export default Homepage;
