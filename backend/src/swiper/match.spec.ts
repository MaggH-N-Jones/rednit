import { MockDatabase } from "../database/MockDatabase";
import { login } from "../users/login";
import { castAsError, castAsOk } from "../utils/testUtils";
import { match } from "./match";

it("should be unauthorized", async () => {
    const db = new MockDatabase();
    const response = await match({
        token: "invalid token",
        swiped: 0,
    }, db);
    expect(response.ok).toBe(false);
    expect(castAsError(response).errorMessage).toBe("Unauthorized")
});

it("should be invalid user", async () => {
    const db = new MockDatabase();
    await db.addUser({
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    });
    const loginResponse = await login({
        username: "terryd",
        password: "1234",
    }, db);
    const response = await match({
        token: castAsOk(loginResponse).token,
        swiped: 1,
    }, db);
    expect(response.ok).toBe(false);
    expect(castAsError(response).errorMessage).toBe("Unknown user")
});

it("should be ok", async () => {
    const db = new MockDatabase();
    await db.addUser({
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    });
    await db.addUser({
        id: 1,
        username: "reimar",
        password: "1234",
        name: "Reimar Open Suse",
        age: 24,
    });
    const loginResponse = await login({
        username: "terryd",
        password: "1234",
    }, db);
    const response = await match({
        token: castAsOk(loginResponse).token,
        swiped: 1,
    }, db);
    expect(response.ok).toBe(true);
});

it("should add match to db", async () => {
    const db = new MockDatabase();
    await db.addUser({
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    });
    await db.addUser({
        id: 1,
        username: "reimar",
        password: "1234",
        name: "Reimar Open Suse",
        age: 24,
    });
    const loginResponse = await login({
        username: "terryd",
        password: "1234",
    }, db);
    const response = await match({
        token: castAsOk(loginResponse).token,
        swiped: 1,
    }, db);
    expect(response.ok).toBe(true);
    const matchesResult = await db.matchesBySwiperId(0);
    expect(castAsOk(matchesResult).value.length).toBe(1)
    expect(castAsOk(matchesResult).value[0].swiped).toBe(1)
});

