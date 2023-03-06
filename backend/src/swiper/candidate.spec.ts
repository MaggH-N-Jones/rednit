import { MockDatabase } from "../database/MockDatabase";
import { login } from "../users/login";
import { castAsError, castAsOk } from "../utils/testUtils";
import { candidate, CandidateRequest } from "./candidate";
import { Candidate } from "./CandidateModel";

it("should be unauthorized", async () => {
    const database = new MockDatabase();
    const request: CandidateRequest = {
        token: "invalid token"
    };
    const response = await candidate(request, database);
    expect(response.ok).toBe(false);
    if (!response.ok)
        expect(response.errorMessage).toBe("Unauthorized")
});

it("should give no valid candidates", async () => {
    const database = new MockDatabase();
    await database.addUser({
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    });
    const loginResponse = await login({
        username: "terryd",
        password: "1234",
    }, database);
    const response = await candidate({
        token: castAsOk(loginResponse).token,
    }, database);
    expect(response.ok).toBe(false);
    expect(castAsError(response).errorMessage).toBe("No valid candidates")
});

it("should give other user", async () => {
    const database = new MockDatabase();
    await database.addUser({
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    });
    await database.addUser({
        id: 1,
        username: "reimar",
        password: "1234",
        name: "Reimar Open Suse",
        age: 24,
    });
    const loginResponse = await login({
        username: "terryd",
        password: "1234",
    }, database);
    const response = await candidate({
        token: castAsOk(loginResponse).token,
    }, database);
    expect(response).toStrictEqual({
        ok: true,
        candidate: {
            id: 1,
            name: "Reimar Open Suse",
            age: 24,
            picture: "http://http.cat/404"
        } as Candidate,
    });
});


