const request = require("supertest");
const Conversation = require("../src/models/conversation");
const app = require("../src/app");
const {
    userOne,
    userTwoId,
    tutorProfileOneId,
    setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a new conversation", async () => {
    // Send a valid request
    const response = await request(app)
        .post("/conversations")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            receiverId: userTwoId,
            tutorProfile: tutorProfileOneId,
        })
        .expect(200);

    const conversation = await Conversation.findById(response.body._id);
    expect(conversation).not.toBeNull();
    expect(response.body.members.some((member) => member == userTwoId)).toBe(
        true
    );

    // Send a request to create a duplicate conversation (Should not create a new conversation)
    await request(app)
        .post("/conversations")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            receiverId: userTwoId,
            tutorProfile: tutorProfileOneId,
        })
        .expect(500);

    // Send a request with missing data (Should not create a new conversation)
    await request(app)
        .post("/conversations")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            receiverId: userTwoId,
        })
        .expect(500);
});

test("Should read a user's conversations", async () => {
    // Send a valid request
    await request(app)
        .get("/conversations/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Send an invalid request
    await request(app).get("/conversations/me").send().expect(401);
});
