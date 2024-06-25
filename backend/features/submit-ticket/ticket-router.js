import express from "express";
import Ticket from "./models/ticketModel.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *  - name: Support
 *    description: Ticket and Support related endpoints
 */

/**
 * @openapi
 * /api/ticket:
 *   post:
 *     tags:
 *       - Support
 *     description: Creates a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               message:
 *                 type: string
 *                 example: "This is a sample message."
 *     responses:
 *
 *       200:
 *         description: Ticket created successfully
 *
 *       500:
 *         description: Internal Server Error
 */

router.post("/api/ticket", (req, res) => {
  new Ticket({
    date: Date.now(),
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
  })
    .save()
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;
