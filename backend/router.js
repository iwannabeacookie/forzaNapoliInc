import fileURLToPath from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from "express";
const router = express.Router();

router.get("/history", (req, res) => {
  // if (/* not req.body.jwt.is_valid() */ todo) {
  //   res.status(401).send("ERROR: UNAUTHORIZED");
  //   return;
  // }

  res.sendFile(join(__dirname, "../public/history.html"));
});

// router.get("/product-list.js", (req, res) => {
//   res.sendFile(join(__dirname, "/product-list.js"));
// });

export default router;
