import { Express } from "express";
import { Database } from "../database/Database";
import { login, LoginRequest } from "../users/login";
import { register, RegisterRequest } from "../users/register";


function usersRegisterRoutes(app: Express, db: Database) {
    app.post("/api/users/register", async (req, res) => {
        const registerRequest: RegisterRequest = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
        }
        const registerResponse = await register(registerRequest, db);
        res.json(registerResponse);
    })
}

function usersLoginRoutes(app: Express, db: Database) {
    app.post("/api/users/login", async (req, res) => {
        const loginRequest: LoginRequest = {
            username: req.body.username,
            password: req.body.password,
        }
        const loginResponse = await login(loginRequest, db);
        res.json(loginResponse);
    })
}

