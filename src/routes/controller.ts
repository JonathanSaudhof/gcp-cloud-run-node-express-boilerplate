import express from "express";
import { error } from "../helper/console";

const router: express.Router = express.Router();

export async function controller(req: express.Request, res: express.Response) {
  try {
    res.send("test");
  } catch (err) {
    error(err);
  }
}

export default router.get("/", controller);
