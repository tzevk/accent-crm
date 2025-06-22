import express from "express";
import { env } from "./env.js";
const port = env.PORT || 5000;
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

const frontendUrl = env.FRONTEND_URL;
console.log(`Frontend running on - \x1b[34m${frontendUrl}\x1b[0m`);
const corsOptions = {
  origin: frontendUrl,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} - \x1b[34mhttp://localhost:${port}\x1b[0m`
  );
});
