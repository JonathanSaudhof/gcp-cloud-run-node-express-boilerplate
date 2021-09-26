import express from "express";
import helmet from "helmet";
import { traceRequest, info, error } from "./helper/console";
import compression from "compression";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: true,
    methods: ["DELETE", "GET", "OPTIONS", "PUT", "POST"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(helmet());
// logging
app.use(traceRequest({ projectId: process.env.GOOGLE_PROJECT }));
app.use(express.json());
app.use(compression());
// define a route handler for the default home page

// alive
app.get("/", (req, res) => {
  res.status(200).json();
});

// import all routes
app.use(routes);

// start the Express server
app.listen(port, () => {
  info(`server started at http://localhost:${port}`);
});
