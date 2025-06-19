import express from "express";
import { env } from "./env.ts";
const port = env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} - \x1b[34mhttp://localhost:${port}\x1b[0m`
  );
});
