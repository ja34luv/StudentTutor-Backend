const User = require("../../src/models/user");
const TutorProfile = require("../../src/models/tutorProfile");
const Conversation = require("../../src/models/conversation");
const Message = require("../../src/models/message");
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

const tutorProfileOneId = new mongoose.Types.ObjectId();
const tutorProfileOne = {
    _id: tutorProfileOneId,
    firstName: userOne.firstName,
    lastName: userOne.lastName,
    sex: userOne.sex,
    avatar: userOne.avatar,
    owner: userOne._id,
    experiences: [
        {
            title: "title_TESTING",
            companyName: "companyName_TESTING",
            startDateMonth: "month_TESTING",
            startDateYear: 2023,
            currentlyWorking: true,
        },
    ],
    education: [
        {
            school: "Simon Fraser University",
            major: "major_TESTING",
            startDateMonth: "month_TESTING",
            startDateYear: 2023,
            endDateMonth: "month_TESTING",
            endDateYear: 2023,
        },
    ],
    languages: [
        {
            language: "Korean",
        },
    ],
    hourlyRate: 20,
    lessonMethod: "Remote",
    aboutMe: "aboutMe_TESTING",
    aboutLesson: "aboutLesson_TESTING",
    subjects: [
        {
            subject: "Physics",
        },
    ],
};

const tutorProfileTwoId = new mongoose.Types.ObjectId();
const tutorProfileTwo = {
    ...tutorProfileOne,
    _id: tutorProfileTwoId,
    education: [
        {
            ...tutorProfileOne.education[0],
            school: "University of British Columbia",
        },
    ],
    languages: [
        {
            language: "English",
        },
    ],
    subjects: [
        {
            subject: "Chemistry",
        },
    ],
};

const tutorProfileThreeId = new mongoose.Types.ObjectId();
const tutorProfileThree = {
    ...tutorProfileTwo,
    _id: tutorProfileThreeId,
    hourlyRate: 40,
    sex: "Female",
    lessonMethod: "Hybrid",
    lessonLocation: "Coquitlam",
    subjects: [
        {
            subject: "Full-stack development",
        },
    ],
};

const tutorProfileFourId = new mongoose.Types.ObjectId();
const tutorProfileFour = {
    ...tutorProfileTwo,
    _id: tutorProfileFourId,
};

const tutorProfileFiveId = new mongoose.Types.ObjectId();
const tutorProfileFive = {
    ...tutorProfileTwo,
    _id: tutorProfileFiveId,
    owner: userTwo._id,
};

const tutorProfileSixId = new mongoose.Types.ObjectId();
const tutorProfileSix = {
    ...tutorProfileTwo,
    _id: tutorProfileSixId,
    owner: userThree._id,
};

const conversationOneId = new mongoose.Types.ObjectId();
const conversationOne = {
    _id: conversationOneId,
    members: [userOneId, userThreeId],
    tutorProfile: tutorProfileFiveId,
};

const setupDatabase = async () => {
    await User.deleteMany();
    await TutorProfile.deleteMany();
    await Conversation.deleteMany();
    await Message.deleteMany();

    // Create users
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(userThree).save();

    // Create tutor profiles
    await new TutorProfile(tutorProfileOne).save();
    await new TutorProfile(tutorProfileTwo).save();
    await new TutorProfile(tutorProfileThree).save();
    await new TutorProfile(tutorProfileFour).save();
    await new TutorProfile(tutorProfileFive).save();

    // Create conversations
    await new Conversation(conversationOne).save();
};

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    userThree,
    userThreeId,
    tutorProfileOne,
    tutorProfileOneId,
    tutorProfileTwo,
    tutorProfileTwoId,
    tutorProfileThree,
    tutorProfileThreeId,
    tutorProfileFour,
    tutorProfileFourId,
    tutorProfileFive,
    tutorProfileFiveId,
    tutorProfileSix,
    tutorProfileSixId,
    conversationOne,
    conversationOneId,
    setupDatabase,
};
