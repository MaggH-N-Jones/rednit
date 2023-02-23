const {generateId}=require("./utils.js")
function makeUserRegisterRoute(app, database) {

    app.post("/api/users/register", (req, res) => {
        if (!req.body.username || !req.body.password || !req.body.name || typeof req.body.username !== "string" || typeof req.body.password !== "string" || typeof req.body.name !== "string" || typeof req.body.age !== "number") {
            return res.status(400).json({
                ok: false,
                errorMessage: "Invalid request",
            });
        }
        const user = {
            id: generateId(),
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age,
            pictures: []
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
}

function makeUserLoginRoute(app, database) {

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
        database.sessions.push({id: generateId(), userId: user.id, token})
        return res.status(200).json({ ok: true, token });
    });
}
module.exports = { makeUserLoginRoute, makeUserRegisterRoute }
