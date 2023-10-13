const request = require("supertest");
const TutorProfile = require("../src/models/tutorProfile");
const app = require("../src/app");
const {
    userOne,
    tutorProfileOneId,
    tutorProfileTwoId,
    tutorProfileFourId,
    tutorProfileFiveId,
    setupDatabase,
} = require("./fixtures/db");

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

test("Should read a user's tutor profiles", async () => {
    // Send a valid request
    const response = await request(app)
        .get("/tutorProfiles/me")
        .query({
            sortBy: "createdAt:desc",
        })
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

test("Should read tutor profiles (General Search)", async () => {
    // Send a valid request without query parameters
    await request(app).get("/tutorProfiles").send().expect(200);

    // Send a valid request with sortBy parameter
    const responseSortBy = await request(app)
        .get("/tutorProfiles")
        .query({
            sortBy: "createdAt:desc",
        })
        .send()
        .expect(200);

    // Check if the tutor profiles are sorted by createdAt in descending order
    const tutorProfilesSortBy = responseSortBy.body;
    for (let i = 1; i < tutorProfilesSortBy.length; i++) {
        const prevCreatedAt = new Date(tutorProfilesSortBy[i - 1].createdAt);
        const currentCreatedAt = new Date(tutorProfilesSortBy[i].createdAt);
        expect(prevCreatedAt >= currentCreatedAt).toBe(true);
    }

    // Send a valid request with school parameter
    const responseSchool = await request(app)
        .get("/tutorProfiles")
        .query({
            school: "Simon Fraser University",
        })
        .send()
        .expect(200);

    expect(
        responseSchool.body.every((tutorProfile) => {
            return tutorProfile.education.some((education) => {
                return education.school === "Simon Fraser University";
            });
        })
    ).toBe(true);

    // Send a valid request with language parameter
    const responseLanguage = await request(app)
        .get("/tutorProfiles")
        .query({
            language: "Korean",
        })
        .send()
        .expect(200);

    expect(
        responseLanguage.body.every((tutorProfile) => {
            return tutorProfile.languages.some((language) => {
                return language.language === "Korean";
            });
        })
    ).toBe(true);

    // Send a valid request with hourlyRate parameter
    const responseHourlyRate = await request(app)
        .get("/tutorProfiles")
        .query({
            hourlyRate: "≤$25.00/hour",
        })
        .send()
        .expect(200);

    expect(
        responseHourlyRate.body.every((tutorProfile) => {
            return tutorProfile.hourlyRate <= 25;
        })
    ).toBe(true);

    // Send a valid request with sex parameter
    const responseSex = await request(app)
        .get("/tutorProfiles")
        .query({
            sex: "Female",
        })
        .send()
        .expect(200);

    expect(
        responseSex.body.every((tutorProfile) => {
            return tutorProfile.sex === "Female";
        })
    ).toBe(true);

    // Send a valid request with lessonMethod parameter
    const responseLessonMethod = await request(app)
        .get("/tutorProfiles")
        .query({
            lessonMethod: "Remote",
        })
        .send()
        .expect(200);

    expect(
        responseLessonMethod.body.every((tutorProfile) => {
            return tutorProfile.lessonMethod === "Remote";
        })
    ).toBe(true);

    // Send a valid request with what parameter
    const responseWhat = await request(app)
        .get("/tutorProfiles")
        .query({
            what: "Chemistry",
        })
        .send()
        .expect(200);

    expect(
        responseWhat.body.every((tutorProfile) => {
            return tutorProfile.subjects.some((subject) => {
                return subject.subject === "Chemistry";
            });
        })
    ).toBe(true);

    // Send a valid request with partial what parameter (full-stack for Full-stack development)
    const responseWhatPartial = await request(app)
        .get("/tutorProfiles")
        .query({
            what: "full-stack",
        })
        .send()
        .expect(200);

    expect(
        responseWhatPartial.body.every((tutorProfile) => {
            return tutorProfile.subjects.some((subject) => {
                return subject.subject === "Full-stack development";
            });
        })
    ).toBe(true);

    // Send a valid request with where parameter
    const responseWhere = await request(app)
        .get("/tutorProfiles")
        .query({
            where: "Coquitlam",
        })
        .send()
        .expect(200);

    expect(
        responseWhere.body.every((tutorProfile) => {
            return tutorProfile.lessonLocation === "Coquitlam";
        })
    ).toBe(true);

    // Send a valid request with what, where, hourlyRate and lessonMethod combination
    const responseCombination = await request(app)
        .get("/tutorProfiles")
        .query({
            what: "chemistry",
            where: "remote",
            hourlyRate: "≤$20.00/hour",
            lessonMethod: "Remote",
        })
        .send()
        .expect(200);

    expect(
        responseCombination.body.every((tutorProfile) => {
            return (
                tutorProfile.subjects.some((subject) => {
                    return subject.subject === "Chemistry";
                }) &&
                tutorProfile.lessonMethod === "Remote" &&
                tutorProfile.hourlyRate <= 20
            );
        })
    ).toBe(true);

    // Send an invalid request with what, where, hourlyRate and lessonMethod combination
    const responseCombinationInvalid = await request(app)
        .get("/tutorProfiles")
        .query({
            what: "chemistry",
            where: "Coquitlam",
            hourlyRate: "≤$20.00/hour",
            lessonMethod: "Remote",
        })
        .send()
        .expect(200);

    expect(responseCombinationInvalid.body).toStrictEqual([]);
});

test("Should update a user's tutor profile", async () => {
    // Send a valid update request
    await request(app)
        .patch(`/tutorProfiles/${tutorProfileTwoId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            headline: "updated_headline_TESTING",
        })
        .expect(200);

    // Send a valid update request
    await request(app)
        .patch(`/tutorProfiles/${tutorProfileTwoId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            hourlyRate: 30,
            aboutMe: "updated_aboutMe_TESTING",
            subjects: [
                {
                    subject: "updated_subject_one_TESTING",
                },
                {
                    subject: "updated_subject_two_TESTING",
                },
            ],
        })
        .expect(200);

    // Send an invalid update request
    await request(app)
        .patch(`/tutorProfiles/${tutorProfileTwoId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            _id: "6528b0dacd2a89ff76e57777",
        })
        .expect(400);
});

test("Should delete a user's tutor profile", async () => {
    // Send a valid delete request
    const response = await request(app)
        .delete(`/tutorProfiles/${tutorProfileFourId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const tutorProfile = await TutorProfile.findById(response.body._id);
    expect(tutorProfile).toBeNull();

    // Send an invalid delete request
    await request(app)
        .delete(`/tutorProfiles/${tutorProfileFiveId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(500);
});
