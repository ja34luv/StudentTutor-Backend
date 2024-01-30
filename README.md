<div align="center">

<img src="./assets/animations/pencil.gif" alt="Pencil_GIF" width="250" height="250">

![GitHub top language](https://img.shields.io/github/languages/top/jayhonglee/GrabPencil-Backend.svg?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/jayhonglee/GrabPencil-Backend.svg?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jayhonglee/GrabPencil-Backend.svg?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/jayhonglee/GrabPencil-Backend.svg?style=for-the-badge)

</div>

# GrabPencil ✏️

Welcome to the **backend code** repository of GrabPencil.

-   If you're interested in the frontend code, you can find it [here](https://github.com/jayhonglee/GrabPencil-Frontend).

![Demo_Gif](./assets/animations/GrabPencil_Demo-ezgif.com-video-to-gif-converter.gif)

## Description

GrabPencil is a **tutor matching website tailored for students** at [Simon Fraser University](https://en.wikipedia.org/wiki/Simon_Fraser_University) and the [University of British Columbia](https://en.wikipedia.org/wiki/University_of_British_Columbia). Students can easily create **tutor profiles** similar to LinkedIn, allowing others to view their information at a glance. The platform includes a built-in **chat system** for quick and easy communication, enabling users to freely connect with tutors that match their preferences. Additionally, GrabPencil encompasses Indeed-like **filter and search features** for enhanced user experience.

-   What was your motivation? <br/> <br/>
    My motivation stemmed from observing my peers, friends, and even my girlfriend seeking tutoring opportunities. While existing tutor matching websites were available, they were saturated with a diverse range of tutors, making it challenging for students to stand out and for users to filter through student tutors. I aimed to create a platform that simplifies this process, allowing students to showcase their tutoring capabilities more effectively and making it easier for users to connect with suitable tutors.

## Table of Contents

-   [GrabPencil](#grabpencil)
-   [Description](#description)
-   [Table of Contents](#table-of-contents)
-   [Outline](#outline)
-   [Usage](#usage)
-   [Features](#features)
-   [Results and Discussion](#results-and-discussion)
    -   [Learning Experience](#learning-experience)
        -   [Frontend-Backend Communication](#frontend-backend-communication)
        -   [Database Integration](#database-integration)
    -   [Challenges Faced](#challenges-faced)
        -   [Marketing Struggles](#marketing-struggles)
    -   [Lesson Learned](#lesson-learned)
    -   [Conclusion](#conclusion)
-   [Credits](#credits)
-   [License](#license)
-   [Badges](#badges)
-   [How to Contribute](#how-to-contribute)

## Outline

-   Written in [JavaScript](https://en.wikipedia.org/wiki/JavaScript).
-   Frontend developed using [React](<https://en.wikipedia.org/wiki/React_(software)>) with [Bootstrap](<https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)>).
-   Backend developed using [Node.js](https://en.wikipedia.org/wiki/Node.js) and [Express.js](https://en.wikipedia.org/wiki/Express.js).
-   Database built using [MongoDB](https://en.wikipedia.org/wiki/MongoDB) with [Mongoose](https://mongoosejs.com/).
-   Real-time connection with [Socket.IO](https://en.wikipedia.org/wiki/Socket.IO).
-   [JWT](https://en.wikipedia.org/wiki/JSON_Web_Token)-based user authentication with password hashing using [bcrypt](https://en.wikipedia.org/wiki/Bcrypt).
-   Backend API endpoint testing using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest).

## Usage

Simply follow the link below and explore the platform!

-   [https://www.grabpencil.com/](https://www.grabpencil.com/)

## Features

-   [x] Account

    -   [x] Login / Logout
    -   [x] Sign up
    -   [x] Add profile picture
    -   [x] Delete account
    -   [x] Edit account information

-   [x] Tutor profile

    -   [x] Create tutor profile
    -   [x] Edit tutor profile
    -   [x] Delete tutor profile

-   [x] User

    -   [x] Search profiles
    -   [x] Filter profiles
    -   [x] Real-time chatting
    -   [x] Real-time online user status

-   [ ] Design
    -   [x] Pagination
    -   [ ] Update about page
    -   [ ] Responsive design

## Results and Discussion

### Learning Experience

#### Frontend-Backend Communication

Developing GrabPencil provided a valuable learning experience in understanding how frontend and backend components communicate via RESTful APIs. The clear separation of concerns between the frontend (React) and the backend (Node.js with Express) allowed for a modular and scalable architecture. Learning to design and implement RESTful APIs facilitated efficient data transfer and communication between the client and server.

#### Database Integration

Integrating MongoDB as the database backend further enhanced my understanding of data storage and retrieval in the context of a web application. The flexibility of MongoDB's document-oriented structure proved beneficial in managing various data types associated with user profiles, tutoring sessions, and other relevant information.

### Challenges Faced

#### Marketing Struggles

While the technical aspects of the project were successfully implemented, one of the most significant challenges faced was in the realm of marketing. Despite efforts such as posting on Reddit to generate awareness and interest, acquiring users proved to be a formidable task.

### Lesson Learned

The realization that effective marketing is essential for the success of a tech project cannot be understated. It highlighted the importance of not only developing a functional and user-friendly application but also actively promoting it to the target audience.

### Conclusion

The GrabPencil project provided a comprehensive learning experience in full-stack development, emphasizing the intricacies of frontend-backend communication and database integration within the MERN stack. The challenges faced in marketing underscored the importance of a well-rounded approach, where technical proficiency must be complemented by strategic promotional efforts.

## Credits

-   This was a solo, full-stack project.

-   The UI/UX was inspired by [Indeed.com](https://ca.indeed.com/) and [LinkedIn](https://www.linkedin.com/feed/).

-   Backend practices were learned and implemented following this [tutorial](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/).

-   <a href="https://www.flaticon.com/free-animated-icons/pencil" title="pencil animated icons">Pencil animated icons created by Freepik - Flaticon</a>

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details

## Badges

-   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
-   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
-   ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
-   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
-   ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
-   ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
-   ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
-   ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
-   ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
-   ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

## How to Contribute

If you would like to provide any feedback or contribute to the project feel free to contact me via my email: ja34luv@gmail.com.
