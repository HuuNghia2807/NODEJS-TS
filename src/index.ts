import express from "express";
import * as dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import connectDB from "./db/connect";
import { authRouter, userRouter } from "./routes";

dotenv.config();
const app = express();

app.get("/hello", (_req: express.Request, res: express.Response) => {
  res.send("Hello word!");
});

// use
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

// server
const port = 8080;
const server = http.createServer(app);

const start = async () => {
  try {
    await connectDB(process.env.DB_URI).then(() => {
      console.log("CONNECT TO DB...");
    });
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
