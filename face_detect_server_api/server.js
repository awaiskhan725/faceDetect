// initilaize express.js
const express = require("express");
// intialize cors for accessing node server
const cors = require("cors");

const app = express();

// app.use is a method for using middleware
// for allowing Access-Control-Allow-Origin
app.use(cors());
// for accessing json object in request body
app.use(express.json());

// dummy database
const database = {
  users: [
    {
      id: "1",
      name: "john",
      email: "john123@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "sally",
      email: "sally_xyz@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

// signin
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("signed in successfully");
  } else {
    res.status(400).json("user signed in failed");
  }
  //   res.send("sending data");
});

// register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

// user profile
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let userExist = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      userExist = true;
      return res.json(user);
    }
  });
  if (!userExist) {
    res.status(404).json("user not found");
  }
});

// update user entries record whenever he submits url for face detect
app.put("/image", (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  let userExist = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      userExist = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!userExist) {
    res.status(404).json("user not found");
  }
});

app.listen(3001, () => {
  console.log("Server running at port:3001");
});
