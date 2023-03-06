import { Database } from "../database/Database"

export type MatchRequest = {
    token: string,
    swiped: number,
}

export type MatchResponse = {
    ok: true,
} | {
    ok: false,
    errorMessage:
    | "Server error"
    | "Unauthorized"
    | "Unknown user",
}

export async function match(request: MatchRequest, db: Database): Promise<MatchResponse> {
    const sessionResult = await db.sessionByToken(request.token);
    if (!sessionResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    if (sessionResult.value === null) {
        return {
            ok: false,
            errorMessage: "Unauthorized",
        }
    }
    const swipedUserResult = await db.userById(request.swiped);
    if (!swipedUserResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    if (swipedUserResult.value === null) {
        return {
            ok: false,
            errorMessage: "Unknown user",
        }
    }
    const matchIdResult = await db.uniqueMatchId();
    if (!matchIdResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    const insertMatchResult = await db.addMatch({
        id: matchIdResult.value,
        swiper: sessionResult.value.id,
        swiped: swipedUserResult.value.id,
    });
    if (!insertMatchResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    return {
        ok: true,
    }
}

