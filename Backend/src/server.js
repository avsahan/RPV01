const express = require("express");
const cors = require("cors");
const db = require("./database");
const session = require("express-session");

const app = express();

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: "venturevista-dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running!");
});

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/api/register", (req, res) => {
  console.log("Registration request received");

  const { name, email, password, preference, role } = req.body;

  try {
    const existingUser = db.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).get(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const result = db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run(name, email, password, role);

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: result.lastInsertRowid,
        name,
        email,
        preference,
        role
      }
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare(`
      SELECT id, name, email, password, role
      FROM users
      WHERE email = ?
    `).get(email);

    // Check whether the user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Check whether the password is correct
    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Create the session after successful login
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({
      message: "Login successful!",
      user: req.session.user
    });

  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

app.post("/api/loginGuide", (req, res) => {
  const { name, phone, email, password, location, year, fee, licence, bio } = req.body;

  try {
    const existingUser = db.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).get(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const result = db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run(name, email, password, role);

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: result.lastInsertRowid,
        name,
        email,
        preference,
        role
      }
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});



app.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Not logged in"
    });
  }

  res.json({
    user: req.session.user
  });
});

app.get("/api/debug-users", (req, res) => {
  const users = db.prepare(`
    SELECT id, name, email, role
    FROM users
  `).all();

  res.json(users);
});