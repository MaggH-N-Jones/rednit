import { Session } from "../users/Session";
import { Database } from "../database/Database"
import { generateToken } from "../utils/utils";

export type LoginRequest = {
    username: string,
    password: string,

}

export type LoginResponse = {
    ok: true,
    token: string,
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
    const sessionIdResult = await db.uniqueSessionId();
    if (!sessionIdResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error"
        }
    }
    const token = generateToken();
    const session: Session = {
        id: sessionIdResult.value,
        userId: userResult.value.id,
        token: token,
    }
    const sessionInsertResult = await db.addSession(session);
    if (!sessionInsertResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }

    return {
        token: token,
        ok: true,
    }
}
