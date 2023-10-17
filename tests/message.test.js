const request = require("supertest");
const Message = require("../src/models/message");
const app = require("../src/app");
const {
    userOne,
    userTwoId,
    tutorProfileOneId,
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

    // const message = await Message.findById(response.body._id);
    // expect(message).not.toBeNull();
    // expect(response.body.text).toBe("Hello buddy :)");

    // // Send a request to create a duplicate conversation (Should not create a new conversation)
    // await request(app)
    //     .post("/conversations")
    //     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //     .send({
    //         receiverId: userTwoId,
    //         tutorProfile: tutorProfileOneId,
    //     })
    //     .expect(500);

    // // Send a request with missing data (Should not create a new conversation)
    // await request(app)
    //     .post("/conversations")
    //     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    //     .send({
    //         receiverId: userTwoId,
    //     })
    //     .expect(500);
});

// test("Should read a user's conversations", async () => {
//     // Send a valid request
//     await request(app)
//         .get("/conversations/me")
//         .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200);

//     // Send an invalid request
//     await request(app).get("/tutorProfiles/me").send().expect(401);
// });
