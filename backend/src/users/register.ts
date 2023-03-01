import { Database } from "../database/Database"
import { User } from "./User"

export type RegisterRequest = {
    username: string,
    password: string,
    name: string,
    age: number,

}

export type RegisterResponse = {
    ok: true,
} | {
    ok: false,
    errorMessage:
    | "Username already in use"
    | "Invalid username"
    | "Invalid name",
}

export async function register(
    request: RegisterRequest,
    db: Database,
): Promise<RegisterResponse> {
    if (request.name == "") {
        return {
            ok: false,
            errorMessage: "Invalid name"
        }
    }
    if (request.username == "") {
        return {
            ok: false,
            errorMessage: "Invalid username"
        }
    }
    if (await db.doesUserWithUsernameExist(request.username)) {
        return {
            ok: false,
            errorMessage: "Username already in use"
        }
    }
    const user: User = {
        username: request.username,
        password: request.password,
        name: request.name,
        age: request.age,
        id: await db.uniqueUserId(),
    }
    db.addUser(user)

    return {
        ok: true,
    }

}