import { Database } from "../database/Database"

export type loginRequest = {
    username: string,
    password: string,

}

export type loginResponse = {
    ok: true,
} | {
    ok: false,
    errorMessage:
    | "Invalid username"
    | "Invalid password"
}

export async function login(
    request: loginRequest,
    db: Database,
): Promise<loginResponse> {
    if (!await db.doesUserWithUsernameExist(request.username)) {
        return {
            ok: false,
            errorMessage: "Invalid username"
        }
    }
    if (!await db.isUsersPasswordCorrect(request.username, request.password)) {
        return {
            ok: false,
            errorMessage: "Invalid password"
        }
    }

    return {
        ok: true,
    }
}