const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const tutorProfileRouter = require("./routers/tutorProfile");
const conversationRouter = require("./routers/conversation");
const messageRouter = require("./routers/message");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(tutorProfileRouter);
app.use(conversationRouter);
app.use(messageRouter);

module.exports = app;
