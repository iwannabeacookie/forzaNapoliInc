import { Router } from "express";
import { sendAllNewsletters, updateNewsletter } from "./newsletter.js";

const newsletterRouter = Router();

/**
 * Grabs all of the users filtering for who has the newsletter enabled,
 * gets all their uselful information, and sends the newsletter
 */
newsletterRouter.post("/newsletter/send-newsletter", async (req, res) => {
  await sendAllNewsletters();
  res.status(200).json(null);
});

/**
 * Changes the parameter of the user received to stop receiving newsletters
 */
newsletterRouter.post(
  "/newsletter/remove-from-newsletter",
  async (req, res) => {
    const reqBody = req.body;
    console.info("Removing from Newsletter", reqBody);

    if ((await updateNewsletter(reqBody.email, false)) === false) {
      res.status(200).json(false);
    } else {
      res.status(500).json(null);
    }
  },
);

/**
 * Changes the parameter of the user received to accept newsletters
 */
newsletterRouter.post("/newsletter/add-to-newsletter", async (req, res) => {
  const reqBody = req.body;
  console.info("Adding to Newsletter", reqBody);

  if ((await updateNewsletter(reqBody.email, true)) === true) {
    res.status(200).json(true);
  } else {
    res.status(500).json(null);
  }
});

export default newsletterRouter;
