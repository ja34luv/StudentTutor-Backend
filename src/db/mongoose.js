const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log("MongoDB Error:", e);
    });
