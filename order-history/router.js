const express = require('express')
const router = express.Router()

/* 
 * Order collection entry:
 * id: 54372895... - ObjectId
 * items: { Vodka: 2, Whiskey: 1, Beer: 140 } - Object
 * date: "YYYY-MM-DD"
 * status: "Delivered" (Delivered, In delivery, Submitted)
*/

router.get('/history', (req, res) => {
  if (/* not req.body.jwt.is_valid() */true) {
    res.status(401).send('ERROR: UNAUTHORIZED')
    return
  }

})
