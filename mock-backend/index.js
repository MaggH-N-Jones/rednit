const express = require("express");
const cors = require("cors");
const path = require("path");
const {makeUserLoginRoute, makeUserRegisterRoute}=require("./users")
const {makeSwiperCandidateRoute, makeSwiperMatchRoute}=require("./swiper")
const port = 8000;

let database = {
    users: [
        { id: 0, username: "reimer", password: "1234", name: "reimer", age: 25, pictures: ["https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"]},
        { id: 1, username: "thies", password: "1234", name: "reimer", age: 26, pictures: ["https://www.incimages.com/uploaded_files/image/1920x1080/getty_481292845_77896.jpg"]},
        { id: 2, username: "tæis", password: "1234", name: "reimer", age: 23, pictures: ["https://cdn.shopify.com/s/files/1/0850/2114/files/tips_to_help_heighten_senses_480x480.png?v=1624399167"]},
        { id: 3, username: "mikel", password: "1234", name: "reimer", age: 27, pictures: ["https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"]},
    ],
    sessions: [],
    matches: [{swiper: 0, swiped: 1}],
};

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((err, _req, res, _next) => {
    if (err && err.type && err.type === 'entity.parse.failed')
        console.error(`${new Date().toISOString()} [API]: Recieved request with invalid JSON request body`);
    res.status(400).json({ error: err })
});
makeUserRegisterRoute(app, database);
makeUserLoginRoute(app, database);
makeSwiperCandidateRoute(app, database);
makeSwiperMatchRoute(app, database);

app.use("/", express.static(path.join(__dirname, "../webapp")))

app.listen(port, () => {
    console.log(`Listening at http://127.0.0.1:${port}/`)
});


