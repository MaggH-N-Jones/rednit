import { MockDatabase } from "../database/MockDatabase"
import { asOk } from "../utils/Result"
import { register, RegisterRequest } from "./register"

it("should fail if username is empty", async () => {
    const request: RegisterRequest = {
        username: "",
        password: "superhemmelig",
        name: "Thise minimælk",
        age: 69,
    }
    const db = new MockDatabase()
    const response = await register(request, db)
    expect(response.ok).toBe(false)
    if (!response.ok) {
        expect(response.errorMessage).toBe("Invalid username")
    }
})

it("should fail if name is empty", async () => {
    const request: RegisterRequest = {
        username: "gamer64",
        password: "superhemmelig",
        name: "",
        age: 69,
    }
    const db = new MockDatabase();
    const response = await register(request, db)
    expect(response.ok).toBe(false)
    if (!response.ok) {
        expect(response.errorMessage).toBe("Invalid name")
    }

})

it("should fail if username already in use", async () => {
    const db = new MockDatabase()
    db.addUser({
        age: 924,
        id: 38134,
        name: "henrik",
        password: "dinmor",
        username: "gamerrr"
    })
    const request: RegisterRequest = {
        username: "gamerrr",
        password: "superhemmelig",
        name: "hi",
        age: 69,
    }
    const response = await register(request, db)
    expect(response.ok).toBe(false)
    if (!response.ok) {
        expect(response.errorMessage).toBe("Username already in use")
    }
})

it("should succeed", async () => {
    const db = new MockDatabase()
    const request: RegisterRequest = {
        username: "username",
        password: "password",
        name: "Full Name",
        age: 46,
    }
    const response = await register(request, db)
    expect(response.ok).toBe(true)
})

it("should put user into database", async () => {
    const db = new MockDatabase()
    const request: RegisterRequest = {
        username: "username",
        password: "password",
        name: "Full Name",
        age: 46,
    }
    const response = await register(request, db)
    expect(response.ok).toBe(true)
    const result = await db.userWithUsernameExist("username")
    expect(result.ok).toBe(true)
    expect(asOk(result).value).toBe(true)
})

it("should contain id given by database", async () => {
    const db = new MockDatabase()
    db.userIdCounter = 1000
    const expectedId = db.userIdCounter;
    const request: RegisterRequest = {
        username: "useruser",
        password: "qassword",
        name: "Name Name",
        age: 16,
    }
    const response = await register(request, db)
    expect(response.ok).toBe(true)
    const createdUser = await db.userById(expectedId)
    expect(createdUser.ok).toBe(true)
    expect(asOk(createdUser).value?.username).toBe(request.username)
})
