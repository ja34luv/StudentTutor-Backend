const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const tutorProfileRouter = require("./routers/tutorProfile");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(tutorProfileRouter);

module.exports = app;
