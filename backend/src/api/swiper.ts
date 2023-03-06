import { Express } from "express";
import { Database } from "../database/Database";
import { candidate, CandidateRequest } from "../swiper/candidate";
import { match } from "../swiper/match";
import { responseStatusCode } from "../utils/utils";

export function swiperRoutes(app: Express, db: Database) {
    swiperCandidateRoute(app, db);
    swiperMatchRoute(app, db);
}

export function swiperCandidateRoute(app: Express, db: Database) {
    app.get("/api/swiper/candidate", async (req, res) => {
        if (
            !req.query.token || typeof req.query.token !== "string"
        ) {
            return res.status(400).json({
                ok: false,
                errorMessage: "Invalid request",
            });
        }
        const request: CandidateRequest = {
            token: req.query.token,
        };
        const response = await candidate(request, db);
        return res.status(responseStatusCode(response)).json(response);
    })
}

export function swiperMatchRoute(app: Express, db: Database) {
    app.post("/api/swiper/match", async (req, res) => {
        if (
            !req.body.token || typeof req.body.token !== "string"
            || !req.body.swiped || typeof req.body.swiped !== "string"
        ) {
            return res.status(400).json({
                ok: false,
                errorMessage: "Invalid request",
            });
        }
        const response = await match({
            token: req.body.token,
            swiped: req.body.swiped,
        }, db);
        return res.status(responseStatusCode(response)).json(response);
    })
}

