import { Database } from "../database/Database"

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
export async function register(request: RegisterRequest, db: Database): Promise<RegisterResponse> {
    if (await db.doesUserWithUsernameAlreadyExist(request.username)) {
        return {
            ok: false,
            errorMessage: "Username already in use"
        }
    }
    if (request.name == "") {
        return {
            ok: false,
            errorMessage: "Invalid name"
        }
    }
    else if (request.username == "") {
        return {
            ok: false,
            errorMessage: "Invalid username"
        }
    }
    else {
        return {
            ok: true,
        }
    }

}