import { MockDatabase } from "../database/MockDatabase"
import { login, LoginRequest } from "./login"


it("should fail if username does not exist", async () => {
    const db = new MockDatabase()
    const request: LoginRequest = {
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
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    })
    const request: LoginRequest = {
        username: "terryd",
        password: "incorrect password",
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
        id: 0,
        username: "terryd",
        password: "1234",
        name: "Terry A. Davis",
        age: 42,
    })
    const request: LoginRequest = {
        username: "terryd",
        password: "1234",
    }
    const response = await login(request, db)
    expect(response.ok).toBe(true)

})
