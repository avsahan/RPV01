const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "React connected to Express successfully!"
    });
});

const guides = [
  {
    id: 1,
    name: "Ishani Perera",
    location: "Kandy, Sri Lanka",
    speciality: "Culture & temple walks",
    description:
      "Explore sacred temples, lakeside lanes and Kandyan traditions at an easy pace.",
    fee: 10500,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Kasun Dissanayake",
    location: "Sigiriya, Sri Lanka",
    speciality: "Ancient cities & heritage",
    description:
      "Uncover the stories of Lion Rock, ancient gardens and the Cultural Triangle.",
    fee: 13500,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Sahan Silva",
    location: "Ella, Sri Lanka",
    speciality: "Trekking & mountain trails",
    description:
      "Guided hikes across Nine Arches Bridge, Little Adam’s Peak, and local tea estates.",
    fee: 12000,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  }
];

app.get("/api/guides", (req, res) => {
  res.json(guides);
});

let users = [];

app.post("/api/register", (req, res) => {
    console.log("Registration request received");
  console.log("Request body:", req.body);
    const { name, email, password, preference, role } = req.body;

    // const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    // if (existingUser) {
    //     return res.status(409).json({
    //         message: "Email is already registered"
    //     });
    // }

    const newUser = {
        id: users.length+1,
        name: name,
        email: email,
        password: password,
        preference: preference,
        role: role
    }
    console.log("before push" + users)
    users.push(newUser);
console.log("after push" +  JSON.stringify(users, null, 2))

    res.status(201).json({
    message: "Registration successful!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      preference: newUser.preference,
      role: newUser.role
    }
  });
})