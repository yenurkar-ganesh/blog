console.log(`Hello Blog Page`);

const express = require("express");
const connectToDB = require("./src/DB/connectDB.js");
const app = express();
const PORT = process.env.PORT || 3200;
const cors = require("cors");
const userSchema = require("./src/models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const util = require("util");
const secret = "faefhafiahfugaawdajdadwdaw";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const blogSchema = require("./src/models/blog.model.js");
// const { default: Post } = require("../frontend/src/components/Post/post.jsx");

// middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
app.use('/uploads', express.static(__dirname + '/uploads'))

// CONNECTION TO DB
connectToDB();

// routes
app.use("/api/blogs", require("./src/routes/blog.route.js"));

//register user
app.get("/register", async (req, res) => {
  try {
    const getUsers = await userSchema.find();
    if (!getUsers) return res.status(401).send({ msg: "No users found" });
    //send back all data from db to client side
    res
      .status(201)
      .json({ message: "Successfully got users from server!", data: getUsers });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ errorMessage: `Error getting users from server ${error}` });
  }
});

// create user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const createUser = await userSchema.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(createUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Please enter both username and password" });
    }

    const loginUser = await userSchema.findOne({ username });

    if (!loginUser) {
      return res.status(404).json({ msg: "Username not found" });
    }

    // Check password only if the user exists
    const validPassword = await bcrypt.compare(password, loginUser.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Login successful, generate JWT token
    jwt.sign({ username, id: loginUser._id }, secret, {}, (err, token) => {
      if (err) {
        return res.status(500).json({ msg: "Error generating token" });
      }

      // Set the token as an HttpOnly cookie with a secure flag
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .json({ id: loginUser._id, username });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

const verifyAsync = util.promisify(jwt.verify);

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const info = await verifyAsync(token, secret);

    res.json(info);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(403).json({ error: "Forbidden" });
  }
});

// LOGOUT
app.post("/logout", (req, res) => {
  // Clear server-side session data if applicable
  res
    .cookie("token", "", {
      maxAge: 0,
      expires: new Date(0),
      secure: true,
      httpOnly: true,
    })
    .json("ok");
});

// new Blog
app.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path.replace();
    fs.renameSync(path, newPath);

    const { title, shortDescription, description, author } = req.body;
    const postBlog = await blogSchema.create({
      title,
      shortDescription,
      description,
      author,
      image: newPath,
    });

    res.json(postBlog);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET POST
// app.get("/blogs", async (req, res) => {
//   try {
//   const posts = await blogSchema.find();
//   res.json(posts);
// } catch (error) {
//   // Handle errors and send an error response
//   console.error("Error fetching posts:", error);
//   res.status(500).json({ error: "Internal Server Error" });
// }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
