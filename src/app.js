const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const userRouter = require("./routers/user");
const tutorProfileRouter = require("./routers/tutorProfile");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/message");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(tutorProfileRouter);
app.use(conversationRouter);
app.use(messageRouter);

module.exports = app;
