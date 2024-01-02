import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../header/header";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (ev, setState) => {
    setState(ev.target.value);
  };

  const handleFileChange = (ev) => {
    // Note: Use ev.target.files[0] instead of ev.target.files
    setFile(ev.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const createNewBlog = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("shortDescription", shortDescription);
    data.append("description", description);
    data.append("author", author);
    data.append("file", file);

    try {
      const response = await fetch("http://localhost:3200/post", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Blog created successfully!");
        setRedirect(true);
      } else {
        alert("Failed to create blog. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <main>
      <Header />
      <form onSubmit={createNewBlog} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => handleInputChange(ev, setTitle)}
        />
        <input
          type="text"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(ev) => handleInputChange(ev, setShortDescription)}
        />
        <ReactQuill
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(ev) => handleInputChange(ev, setAuthor)}
        />
        {/* Note: Updated the file input */}
        <input type="file" name="file" onChange={handleFileChange} />

        <button style={{ marginTop: "15px" }}>Post A Blog</button>
      </form>
      {redirect && <Navigate to={"/"} />}
    </main>
  );
};
