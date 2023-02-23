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

    })
}
