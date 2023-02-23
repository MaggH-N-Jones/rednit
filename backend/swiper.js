function makeSwiperCandidateRoute(app, database) {
    app.get("/api/swiper/candidate", (req, res) => {
        if (!req.query.token) {
            return req.status(400).json({
                ok: false,
                errorMessage: "Unauthorized",
            });
        }
        const token = req.query.token
        const session = database.sessions.find((session) => session.token === token);
        if (!session) {
            return req.status(400).json({
                ok: false,
                errorMessage: "Unauthorized",
            });
        }
        const user = database.users.find(({ id }) => id === session.userId);
        if (!user) {
            return res.status(500).json({
                ok: false,
                errorMessage: "Could not find user",
            });
        }
        const allOtherUsers = database.users.filter((otherUser) => otherUser.id !== user.id)
        const randomUser = allOtherUsers[Math.floor(Math.random() * allOtherUsers.length)]
        const candidate = {
            id: randomUser.id,
            picture: firstPictureOrPlaceholder(randomUser),
            name: randomUser.name,
            age: randomUser.age,
        }
    })
}
function firstPictureOrPlaceholder(user) {
    if (user.pictures.length > 0)
        return user.pictures[0]
    else
        return "https://http.cat/404"
}
