import { Router } from "express";
import coinbaseImport from "./controller";

const routes = Router();

// define all route paths

// health check
routes.use("/", (req, res) => {
  res.status(200).json();
});

routes.use("/import", coinbaseImport);

// export all routes
export default routes;
