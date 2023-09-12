require("./db/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const tutorProfileRouter = require("./routers/tutorProfile");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(tutorProfileRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});

module.exports = app;
