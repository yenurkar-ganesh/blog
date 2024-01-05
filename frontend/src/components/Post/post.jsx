import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function Post({
  title,
  shortDescription,
  description,
  image,
  author,
  createdAt,
  _id
}) {
  return (
    <div className="post">
      <div className="postImg">
        <img src={"http://localhost:3200/" + image} alt={title} />
      </div>

      <div className="postText">
        <div className="info">
          <h2 className="postTitle" style={{ margin: "0px", padding: "0px" }}>{title}</h2>
          <p className="authorInfo">
            <span className="author">{author}</span>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <p style={{ margin: 0 }}>
            <Link
              style={{
                textDecoration: "none",
                color: "#ffa351",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              to={`/api/blogs/${_id}`}
            >
              Learn More <FaAngleDoubleRight />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
