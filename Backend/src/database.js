const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "venturevista.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS guide_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    traveler_id INTEGER NOT NULL,
    guide_id INTEGER NOT NULL,
    itinerary TEXT,
    budget REAL,
    status TEXT NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (traveler_id) REFERENCES users(id),
    FOREIGN KEY (guide_id) REFERENCES users(id)
  );
`);

console.log("SQLite database connected successfully!");

module.exports = db;
