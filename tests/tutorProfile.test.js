const request = require("supertest");
const TutorProfile = require("../src/models/tutorProfile");
const app = require("../src/app");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a new tutor profile", async () => {
    // Send a valid request
    const response = await request(app)
        .post("/tutorProfiles")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
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
                    language: "English",
                },
            ],
            hourlyRate: 20,
            lessonMethod: "Remote",
            aboutMe: "aboutMe_TESTING",
            aboutLesson: "aboutLesson_TESTING",
            subjects: [
                {
                    subject: "subject_TESTING",
                },
            ],
        })
        .expect(201);

    const tutorProfile = await TutorProfile.findById(response.body._id);
    expect(tutorProfile).not.toBeNull();
    expect(response.body.firstName).toEqual(userOne.firstName);

    // Send a request with missing data
    await request(app)
        .post("/tutorProfiles")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            aboutMe: "aboutMe_TESTING",
            aboutLesson: "aboutLesson_TESTING",
        })
        .expect(400);
});
