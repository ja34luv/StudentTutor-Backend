const User = require("../../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    firstName: "userOne_firstName_TESTING",
    lastName: "userOne_lastName_TESTING",
    email: "userOne_email_TESTING@testing.com",
    password: "pass_word_TESTING",
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
        },
    ],
    sex: "Male",
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    firstName: "userTwo_firstName_TESTING",
    lastName: "userTwo_lastName_TESTING",
    email: "userTwo_email_TESTING@testing.com",
    password: "pass_word_TESTING",
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
        },
    ],
    sex: "Female",
};

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
    _id: userThreeId,
    firstName: "userThree_firstName_TESTING",
    lastName: "userThree_lastName_TESTING",
    email: "userThree_email_TESTING@testing.com",
    password: "pass_word_TESTING",
    tokens: [
        {
            token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET),
        },
    ],
    sex: "Male",
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();
};

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    userThree,
    userThreeId,
    setupDatabase,
};
