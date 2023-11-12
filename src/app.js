const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./db/mongoose");

const userRouter = require("./routers/user");
const tutorProfileRouter = require("./routers/tutorProfile");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/message");

const app = express();

// Enable CORS for all routes
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(tutorProfileRouter);
app.use(conversationRouter);
app.use(messageRouter);

module.exports = app;
