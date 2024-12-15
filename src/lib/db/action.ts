"use server";
import { db } from "./db";

export async function postFeedBack({ feedback }: { feedback: string }) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feedback TEXT
    );
  `);

  try {
    const mutation = await db.execute({
      sql: "INSERT INTO feedback (feedback) VALUES (?);",
      args: [feedback],
    });
    if (Boolean(mutation.lastInsertRowid)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e, "ERROR HERE");
    return false;
  }
}
