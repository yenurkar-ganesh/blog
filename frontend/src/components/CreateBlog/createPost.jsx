// import React from "react"; // This import is not needed
import ReactQuill from "react-quill"; // Correct import statement
import "react-quill/dist/quill.snow.css";
import Header from "../header/header";
import { useState } from "react";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [content, setContent] = useState("");

  return (
    <main>
      <Header />
      <form>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />
        <input
          type="summery"
          placeholder={"Summery"}
          value={summery}
          onChange={(ev) => {
            setSummery(ev.target.value);
          }}
        />
        <input type="file" />
        <ReactQuill
          value={content}
          onChange={(newValue) => {
            setContent(newValue);
          }}
        />
        <button style={{ marginTop: "15px" }}>Post A Blog</button>
      </form>
    </main>
  );
};
