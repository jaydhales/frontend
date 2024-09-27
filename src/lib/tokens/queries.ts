/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type sqlite3 from "sqlite3";
import z from "zod";
const ZTokenRowSchema = z.object({
  ID: z.number(),
  Address: z.string(),
  Decimals: z.number().int(),
  Symbol: z.string(),
});
type TTokenRow = z.infer<typeof ZTokenRowSchema>;
// Function to search tokens by a search term (e.g., Symbol or Address)
export const searchTokens = (db: sqlite3.Database, searchTerm: string) => {
  const query = `SELECT * FROM tokens WHERE Symbol LIKE ? OR Address LIKE ? LIMIT 20`;

  // Using '%' for partial match on search term
  const searchValue = `%${searchTerm}%`;
  return new Promise<TTokenRow[]>((res, rej) => {
    db.all(query, [searchValue, searchValue], (err, rows) => {
      if (err) {
        rej();
        console.error("Error searching tokens:", err.message);
      } else if (rows.length === 0) {
        res([]);
        console.log("No tokens found matching the search term.");
      } else {
        console.log("Search Results:");
        const parsedRows = z.array(ZTokenRowSchema).safeParse(rows);
        if (!parsedRows.success) {
          res([]);
          return;
        }
        console.log(parsedRows.success, "Parsed Success");
        res(parsedRows.data);
        return;
      }
    });
  });
};
