import { Database } from "../database/Database";
import { Candidate } from "./CandidateModel"

export type CandidateRequest = {
    token: string,
}

export type CandidateResponse = {
    ok: true,
    candidate: Candidate,
} | {
    ok: false,
    errorMessage:
    | "Server error"
    | "No valid candidates"
    | "Unauthorized"
}

export async function candidate(request: CandidateRequest, db: Database): Promise<CandidateResponse> {
    const sessionResult = await db.sessionByToken(request.token);
    if (!sessionResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    if (sessionResult.value == null) {
        return {
            ok: false,
            errorMessage: "Unauthorized",
        }
    }
    const allUsersExceptCurrentResult = await db.allUsersExceptWithId(sessionResult.value.id);
    if (!allUsersExceptCurrentResult.ok) {
        return {
            ok: false,
            errorMessage: "Server error",
        }
    }
    const allUsersExceptCurrent = allUsersExceptCurrentResult.value;
    if (allUsersExceptCurrent.length === 0) {
        return {
            ok: false,
            errorMessage: "No valid candidates",
        }
    }
    const candidateIndex = Math.floor(allUsersExceptCurrent.length * Math.random());
    const candidateUser = allUsersExceptCurrent[candidateIndex];
    const candidate: Candidate = {
        id: candidateUser.id,
        name: candidateUser.name,
        age: candidateUser.age,
        picture: "http://http.cat/404",
    };
    return {
        ok: true,
        candidate: candidate,
    }
}

