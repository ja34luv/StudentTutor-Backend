const request = require("supertest");
const TutorProfile = require("../src/models/tutorProfile");
const app = require("../src/app");
const { userOne, tutorProfileOneId, setupDatabase } = require("./fixtures/db");

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

    // Send a request with missing data (Should not create a new tutor profile)
    await request(app)
        .post("/tutorProfiles")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            aboutMe: "aboutMe_TESTING",
            aboutLesson: "aboutLesson_TESTING",
        })
        .expect(400);
});

test("Should read user's tutor profiles", async () => {
    // Send a valid request
    const response = await request(app)
        .get("/tutorProfiles/me?sortBy=createdAt:desc")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Check if the tutor profiles are sorted by createdAt in descending order
    const tutorProfiles = response.body;
    for (let i = 1; i < tutorProfiles.length; i++) {
        const prevCreatedAt = new Date(tutorProfiles[i - 1].createdAt);
        const currentCreatedAt = new Date(tutorProfiles[i].createdAt);
        expect(prevCreatedAt >= currentCreatedAt).toBe(true);
    }

    // Send an invalid request
    await request(app)
        .get("/tutorProfiles/me?sortBy=createdAt:desc")
        .send()
        .expect(401);
});

test("Should read a specific tutor profile", async () => {
    // Send a valid request
    await request(app)
        .get(`/tutorProfiles/${tutorProfileOneId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Send an invalid request
    await request(app)
        .get("/tutorProfiles/InvalidRequestId")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404);

    await request(app)
        .get(`/tutorProfiles/${tutorProfileOneId}`)
        .send()
        .expect(401);
});
