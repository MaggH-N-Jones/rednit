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
    | "Invalid username"
    | "Invalid password"
}

export async function login(
    request: LoginRequest,
    db: Database,
): Promise<LoginResponse> {
    const user = await db.userByUsername(request.username);
    if (!user) {
        return {
            ok: false,
            errorMessage: "Invalid username",
        };
    }
    if (user.password !== request.password) {
        return {
            ok: false,
            errorMessage: "Invalid password"
        }
    }

    return {
        ok: true,
    }
}
