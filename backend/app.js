console.log(`Hello Blog Page`);

const express = require("express");
const connectToDB = require("./src/DB/connectDB.js");
const app = express();
const PORT = process.env.PORT || 3200;
const cors = require("cors");
const userSchema = require("./src/models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "faefhafiahfugaawdajdadwdaw";

// middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
require("dotenv").config();

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
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const loginUser = await userSchema.findOne({ username });

  if (!loginUser) {
    return res.status(400).json({ msg: "Username not found!" });
  }

  // Check password only if the user exists
  let validPassword = bcrypt.compareSync(password, loginUser.password);

  if (!validPassword) {
    return res.status(404).json({ msg: `Password not valid!!` });
  }

  // Login successful, generate JWT token
  jwt.sign({ username, id: loginUser._id }, secret, {}, (err, token) => {
    if (err) throw err;
    res.cookie(`token ${token} `).json("ok");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
