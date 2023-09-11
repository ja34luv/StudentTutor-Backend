const request = require("supertest");
const User = require("../src/models/user");
const app = require("../src/app");
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    userThree,
    userThreeId,
    setupDatabase,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
    // Signup a new user with no violation
    const response = await request(app)
        .post("/users")
        .send({
            firstName: "firstName_TESTING",
            lastName: "lastName_TESTING",
            email: "ja34luv@gmail.com",
            password: "pass_word_TESTING",
            sex: "Male",
        })
        .expect(201);

    // Check db has been updated
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Check response is correct
    expect(response.body).toMatchObject({
        user: {
            firstName: "firstName_TESTING",
            lastName: "lastName_TESTING",
            email: "ja34luv@gmail.com",
        },
        token: user.tokens[0].token,
    });

    // Reject signup without firstName
    await request(app)
        .post("/users")
        .send({
            firstName: "",
            lastName: "lastName_TESTING",
            email: "ja34luv@gmail.com",
            password: "pass_word_TESTING",
        })
        .expect(400);

    // Reject signup without lastName
    await request(app)
        .post("/users")
        .send({
            firstName: "firstName_TESTING",
            lastName: "",
            email: "ja34luv@gmail.com",
            password: "pass_word_TESTING",
        })
        .expect(400);

    // Reject signup without email
    await request(app)
        .post("/users")
        .send({
            firstName: "firstName_TESTING",
            lastName: "lastName_TESTING",
            email: "",
            password: "pass_word_TESTING",
        })
        .expect(400);

    // Reject signup without password
    await request(app)
        .post("/users")
        .send({
            firstName: "firstName_TESTING",
            lastName: "lastName_TESTING",
            email: "ja34luv@gmail.com",
            password: "",
        })
        .expect(400);
});

test("Should login existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password,
        })
        .expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: "wrong_pass_word_TESTING",
        })
        .expect(400);
});

test("Should logout existing user", async () => {
    await request(app)
        .post("/users/logout")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should logout all existing user", async () => {
    // login to create a second token after first token from signup
    await request(app)
        .post("/users/login")
        .send({
            email: userTwo.email,
            password: userTwo.password,
        })
        .expect(200);

    // logoutAll to remove all existing two tokens
    await request(app)
        .post("/users/logoutAll")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userTwoId);
    expect(user.tokens).toStrictEqual([]);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/portrait small size.jpg")
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("Should get avatar image for user", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/portrait small size.jpg")
        .expect(200);

    await request(app).get(`/users/${userThree._id}/avatar`).expect(200);
});

test("Should update valid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            firstName: "userOne_updated_firstName_TESTING",
        })
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.firstName).toEqual("userOne_updated_firstName_TESTING");

    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            lastName: "userOne_updated_lastName_TESTING",
        })
        .expect(200);

    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: "userOne_updated_pass_word_TESTING",
        })
        .expect(200);
});

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: "userone_updated_email_testing@testing.com",
        })
        .expect(400);
});

test("Should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
    request(app).delete("/users/me").send().expect(401);
});

test("Should delete avatar image for user", async () => {
    // upload avatar image
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/portrait small size.jpg")
        .expect(200);

    // delete avatar image
    await request(app)
        .delete("/users/me/avatar")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userTwoId);
    expect(user.avatar).toBeUndefined();
});

test("Should not delete avatar image for unauthenticated user", async () => {
    // upload avatar image
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/portrait small size.jpg")
        .expect(200);

    // delete avatar image
    await request(app).delete("/users/me/avatar").send().expect(401);
});
