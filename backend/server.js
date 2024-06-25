// General imports
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import MongoDbSession from "connect-mongodb-session";
import swaggerUi from "swagger-ui-express";
import { openApiSpecification } from "./swaggerDocConfig.js";

// Authentication imports
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";

// Routes
import authRouter from "./features/user-auth/auth.js";
import historyRouter from "./features/order-history/history-router.js";
import ticketRouter from "./features/submit-ticket/ticket-router.js";
import cartRouter from "./features/cart-management/cart-router.js";
import cataloueRouter from "./features/browse-catalogue/catalogue-router.js";
import itemRouter from "./features/inspect-item/item-router.js";
import reviewRouter from "./features/leave-reviews/reviews-router.js";
import newsletterRouter from "./features/newsletter/newsletter-router.js";

const app = express();
const port = 3000;
const MongoDbStore = MongoDbSession(session);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const mClient = import("./mongodb/mongodb.js");

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  databaseName: "Data",
  collection: "FNSession",
});

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.set("view engine", "ejs");

//Setting up the session

app.use(passport.authenticate("session"));
app.use(passport.session());

//Setting up the router

app.use("/", authRouter);
app.use(historyRouter);
app.use(ticketRouter);
app.use(cartRouter);
app.use(cataloueRouter);
app.use(itemRouter);
app.use(newsletterRouter);
app.use(reviewRouter);

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

//Setting up the listener

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
