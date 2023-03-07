import cors from "cors";
import express, { json, urlencoded } from "express";
import { ErrorRequestHandler } from "express";
import { join } from "path";
import { Database } from "../database/Database";
import { swiperRoutes } from "./swiper";
import { usersRoutes } from "./users";

export function api(db: Database) {
    const port = 8000;
    const app = express();

    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(jsonError());

    usersRoutes(app, db);
    swiperRoutes(app, db);

    app.use("/", express.static(join(__dirname, "../../../webapp")))

    app.listen(port, () => {
        console.log(`Express running at http://localhost:${port}`);
    })
}

function jsonError() {

    const jsonErrorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
        if (err && err.type && err.type === 'entity.parse.failed')
            console.error(`${new Date().toISOString()} [API]: Recieved request with invalid JSON request body`);
        res.status(400).json({ error: err })
    }
    return jsonErrorMiddleware;
}

