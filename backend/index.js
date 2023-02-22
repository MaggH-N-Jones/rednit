const express = require("express");
const cors = require("cors");
const path = require("path");

const port = 8000;

let database = {
    users: [
        { username: "riemer", password: "1234" },
        { username: "thies", password: "1234" },
        { username: "tæis", password: "1234" },
        { username: "mikel", password: "1234" },
    ],
    sessions: [],
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

app.post("/api/users/register", (req, res) => {
    if (!req.body.username || !req.body.password || typeof req.body.username !== "string" || typeof req.body.password !== "string") {
        return res.status(400).json({
            ok: false,
            errorMessage: "Invalid request",
        });
    }
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    if (username === "") {
        return res.status(400).json({
            ok: false,
            errorMessage: "Invalid username",
        });
    }
    if (database.users.find(({ username }) => username == user.username) !== undefined) {
        return res.status(400).json({
            ok: false,
            errorMessage: "Username already in use",
        });
    }
    database.users.push(user);
    return res.status(200).json({ ok: true });
});

app.post("/api/users/login", (req, res) => {
    if (!req.body.username || !req.body.password || typeof req.body.username !== "string" || typeof req.body.password !== "string") {
        return res.status(400).json({
            ok: false,
            errorMessage: "Invalid request",
        });
    }
    const credentials = {
        username: req.body.username,
        password: req.body.password,
    };
    const user = database.users.find(({ username }) => username == credentials.username);
    if (!user) {
        return res.status(400).json({
            ok: false,
            errorMessage: "Invalid username",
        });
    }
    if (user.password !== credentials.password) {
        return res.status(400).json({
            ok: false,
            errorMessage: "Invalid password",
        });
    }
    const token = Math.round(Math.random() * (10 ** 6)).toString();
    return res.status(200).json({ ok: true, token });
});

app.use("/", express.static(path.join(__dirname, "../webapp")))

app.listen(port, () => {
    console.log(`Listening at http://127.0.0.1:${port}/`)
});


