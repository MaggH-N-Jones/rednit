import { Express } from "express";
import { Database } from "../database/Database";
import { login, LoginRequest } from "../users/login";
import { register, RegisterRequest } from "../users/register";
import { responseStatusCode } from "../utils/utils";

export function usersRoutes(app: Express, db: Database) {
    usersRegisterRoute(app, db);
    usersLoginRoute(app, db);
}

export function usersRegisterRoute(app: Express, db: Database) {
    app.post("/api/users/register", async (req, res) => {
        if (
            !req.body.username || typeof req.body.username !== "string"
            || !req.body.password || typeof req.body.password !== "string"
            || !req.body.name || typeof req.body.name !== "string"
            || typeof req.body.age !== "number"
        ) {
            return res.status(400).json({
                ok: false,
                errorMessage: "Invalid request",
            });
        }
        const registerRequest: RegisterRequest = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
        }
        const registerResponse = await register(registerRequest, db);
        res.status(responseStatusCode(registerResponse)).json(registerResponse);
    })
}

export function usersLoginRoute(app: Express, db: Database) {
    app.post("/api/users/login", async (req, res) => {
        if (
            !req.body.username || typeof req.body.username !== "string"
            || !req.body.password || typeof req.body.password !== "string"
        ) {
            return res.status(400).json({
                ok: false,
                errorMessage: "Invalid request",
            });
        }
        const loginRequest: LoginRequest = {
            username: req.body.username,
            password: req.body.password,
        }
        const loginResponse = await login(loginRequest, db);
        res.status(responseStatusCode(loginResponse)).json(loginResponse);
    })
}

