/* eslint-disable @typescript-eslint/no-unsafe-call */
import sqlite3 from "sqlite3";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-member-access
const db = new sqlite3.Database("tokens.db", (err) => {
  if (err) {
    console.error("Error opening the database:");
  } else {
    console.error("Connected to the SQLite database.");
  }
});

export default db;
