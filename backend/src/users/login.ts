import { Database } from "../database/Database"

export type LoginRequest = {
    username: string,
    password: string,

}

export type LoginResponse = {
    ok: true,
} | {
    ok: false,
    errorMessage:
    | "Server error"
    | "Invalid username"
    | "Invalid password"
}

export async function login(
    request: LoginRequest,
    db: Database,
): Promise<LoginResponse> {
    const userResult = await db.userByUsername(request.username);
    if (!userResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        };
    }
    if (!userResult.value) {
        return {
            ok: false,
            errorMessage: "Invalid username",
        };
    }
    if (userResult.value.password !== request.password) {
        return {
            ok: false,
            errorMessage: "Invalid password"
        }
    }

    return {
        ok: true,
    }
}
