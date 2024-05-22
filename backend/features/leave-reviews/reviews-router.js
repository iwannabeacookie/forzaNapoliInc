import express from 'express';
import usercollection from "../user-auth/models/userModel.js";
import itemModel from '../../models/itemModel.js';
import { checkAuth } from '../../helpers/auth.js'

const reviewRouter = express.Router();

reviewRouter.post('/post/review', checkAuth, async (req, res) => {
    req.sessionStore.get(req.body.sessionid._value, async (error, session) => {
        if (session) {
            if (session.passport) {
                const user = await usercollection.findById(session.passport.user.id);
                const item = await itemModel.findById(req.body.itemid)
                const order = user.orders.find(order => order.items.some(item => item.article === 'article_vodka'));
                const review = {
                    userName: user.name,
                    userSurname: user.surname,
                    userId: user._id,
                    certified: false,
                    text: req.body.comment
                }
                if(order){
                    review.certified = true;
                }
                item.reviews.push(review);
                item.save();
                res.send("review added");
            }
        }
    });
});

export default reviewRouter