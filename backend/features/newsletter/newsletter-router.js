import { Router } from "express";
import { sendAllNewsletters, updateNewsletter } from "./newsletter.js";

const newsletterRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Newsletter
 *     description: Newsletter related endpoints
 */

/**
 * @openapi
 * /newsletter/send-newsletters:
 *    post:
 *      tags:
 *          - Newsletter
 *      description: Grabs all of the users filtering for who has the newsletter enabled, gets all their uselful information, and sends the newsletter
 *      responses:
 *        200:
 *          description: Returns true, confirming newsletters have been sent
 *        500:
 *          description: returns false, indicating an error with the server
 */
newsletterRouter.post("/newsletter/send-newsletters", async (req, res) => {
  const newsletters = await sendAllNewsletters();
  if (newsletters === true) {
    res.status(200).json(true);
  } else {
    res.status(500).json(false);
  }
});

/**
 * @openapi
 * /newsletter/remove-from-newsletter:
 *   put:
 *     tags:
 *        - Newsletter
 *     description: Changes the parameter of the user received to stop receiving newsletters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email to identify the user to change the newsletter status of
 *     responses:
 *       200:
 *         description: Retuns false, indicating the user was correctly removed from the newsletter
 *       500:
 *         description: Returns true, indicating the user wasn't correctly removed from the newsletter
 *       400:
 *         description: Returns true, indicating the user wasn't correctly removed from the newsletter due to the email not being specified in the request body
 *       401:
 *         description: Returns true, indicating the user wasn't correctly removed from the newsletter due to the email being specified in the request body not returning a match
 */
newsletterRouter.put("/newsletter/remove-from-newsletter", async (req, res) => {
  const reqBody = req.body;
  console.info("Remving from Newsletter", reqBody);
  if (reqBody.email === undefined) {
    return res.status(400).json(false);
  }
  const newsletterUpdate = await updateNewsletter(reqBody.email, false);
  if (newsletterUpdate === false) {
    res.status(200).json(false);
  } else if (newsletterUpdate === "Invalid Email") {
    return res.status(401).json(true);
  } else {
    res.status(500).json(true);
  }
});

/**
 * @openapi
 * /newsletter/add-to-newsletter:
 *   put:
 *     tags:
 *        - Newsletter
 *     description: Changes the parameter of the user received to accept newsletters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email to identify the user to change the newsletter status of
 *     responses:
 *       200:
 *         description: Returns true, indicating the user was correctly added to the newsletter
 *       500:
 *         description: Returns false, indicating the user wasn't correctly added to the newsletter
 *       400:
 *         description: Returns false, indicating the user wasn't correctly added to the newsletter due to the email not being specified in the request body
 *       401:
 *         description: Returns false, indicating the user wasn't correctly added to the newsletter due to the email being specified in the request body not returning a match
 */
newsletterRouter.put("/newsletter/add-to-newsletter", async (req, res) => {
  const reqBody = req.body;
  console.info("Adding to Newsletter", reqBody);
  if (reqBody.email === undefined) {
    return res.status(400).json(false);
  }
  const newsletterUpdate = await updateNewsletter(reqBody.email, true);
  if (newsletterUpdate === true) {
    res.status(200).json(true);
  } else if (newsletterUpdate === "Invalid Email") {
    return res.status(401).json(false);
  } else {
    res.status(500).json(false);
  }
});

export default newsletterRouter;
