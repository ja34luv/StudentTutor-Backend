const request = require("supertest");
const Message = require("../src/models/message");
const app = require("../src/app");
const {
    userOne,
    userTwo,
    conversationOneId,
    setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create a new message", async () => {
    // Send a valid request
    const response = await request(app)
        .post("/messages")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            conversation: conversationOneId,
            text: "Hello buddy :)",
        })
        .expect(200);

    const message = await Message.findById(response.body._id);
    expect(message).not.toBeNull();
    expect(response.body.text).toBe("Hello buddy :)");

    // Send an invalid request
    await request(app)
        .post("/messages")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            conversation: "123456789000000000000000",
            text: "Hello buddy :)",
        })
        .expect(404);

    // Send an invalid request
    await request(app)
        .post("/messages")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send({
            conversation: conversationOneId,
            text: "Hello buddy :)",
        })
        .expect(403);
});

test("Should read a messages", async () => {
    // Send a valid request
    await request(app)
        .get(`/messages/${conversationOneId}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // Send an invalid request
    await request(app)
        .get(`/messages/${conversationOneId}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(403);
});
