import { Router } from "express";
import { sendAllNewsletters } from "./newsletter.js";

const newsletterRouter = Router();

newsletterRouter.post("/sendNewsletter", async (req, res) => {
  // Grabs all of the users filtering for who has the newsletter enabled, gets all their uselful information, and sends the newsletter
  await sendAllNewsletters();
  res.json(null);
  res.status(200);
});

newsletterRouter.post("/removeFromNewsletter", (req, res) => {
  // Changes the parameter of the user received to accept newsletters
});

newsletterRouter.post("addToNewsletter", (req, res) => {
  // Changes the parameter of the user received to accept newsletters
});

export default newsletterRouter;
