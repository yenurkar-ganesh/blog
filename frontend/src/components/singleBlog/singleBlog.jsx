import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import Header from "../header/header";

const SingleBlog = () => {
  const { id } = useParams();
  const [showOneBlog, setShowOneBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3200/api/blogs/${id}`)
      .then((response) => response.json())
      .then((blog) => {
        setShowOneBlog(blog);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <p>ALL BLOGS / ID : {id}</p>
        {showOneBlog && (
          <section className="singleBlogSection">
            <div className="blogImage">
              <img
                className="singleBlogImage"
                src={"http://localhost:3200/" + showOneBlog.image}
                alt=""
              />
            </div>
            <h1>{showOneBlog.title}</h1>
            <p>
              by: {showOneBlog.author} & Publish in{" "}
              {
                <time>
                  {format(new Date(showOneBlog.createdAt), "MMM d, yyyy HH:mm")}
                </time>
              }{" "}
            </p>
            <div className="singleBlogShort">
              {showOneBlog.shortDescription}
            </div>
            <div className="singleBlogDescription">
              Full info :<p>{showOneBlog.description}</p>{" "}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default SingleBlog;
