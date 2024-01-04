import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../header/header";
import { Navigate } from "react-router-dom";
import DOMPurify from "dompurify";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (ev, setState) => setState(ev.target.value);

  const handleFileChange = (ev) => setFile(ev.target.files[0]);

  const handleDescriptionChange = (value) => setDescription(value);

  const handlePaste = (ev) => {
    ev.preventDefault();
    const clipboardData = ev.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const sanitizedData = DOMPurify.sanitize(pastedData);
    document.execCommand("insertText", false, sanitizedData);
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
    <>
      <Header />
      <main>
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
            modules={modules}
            formats={formats}
            onPaste={handlePaste}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(ev) => handleInputChange(ev, setAuthor)}
          />
          <input type="file" name="file" onChange={handleFileChange} />
          <button style={{ marginTop: "15px" }}>Post A Blog</button>
        </form>
        {redirect && <Navigate to={"/"} />}
      </main>
    </>
  );
};
