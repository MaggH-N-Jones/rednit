import { Database } from "../database/Database"
import { MockDatabase } from "../database/MockDatabase"
import { login, loginRequest } from "./login"

it("should fail if username does not exist", async () => {
    const db = new MockDatabase()
    db.addUser({
        age: 924,
        id: 38134,
        name: "henrik",
        password: "dinmor",
        username: "gamerrr"
    })
    const request: loginRequest = {
        username: "gamer",
        password: "dinmor",
    }
    const response = await login(request, db)
    expect(response.ok).toBe(false)
    if (!response.ok) {
        expect(response.errorMessage).toBe("Invalid username")
    }
})

it("should fail if password is wrong", async () => {
    const db = new MockDatabase()
    db.addUser({
        age: 924,
        id: 38134,
        name: "henrik",
        password: "dinmor",
        username: "gamerrr"
    })
    const request: loginRequest = {
        username: "gamerrr",
        password: "1234",
    }
    const response = await login(request, db)
    expect(response.ok).toBe(false)
    if (!response.ok) {
        expect(response.errorMessage).toBe("Invalid password")
    }
})

it("should pass if username and password is correct", async () => {
    const db = new MockDatabase()
    db.addUser({
        age: 924,
        id: 38134,
        name: "henrik",
        password: "dinmor",
        username: "letmein"
    })
    const request: loginRequest = {
        username: "letmein",
        password: "dinmor",
    }
    const response = await login(request, db)
    expect(response.ok).toBe(true)
    
})
