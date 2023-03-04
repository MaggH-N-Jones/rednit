import { User } from "../users/User";
import { ok, Result as ResultType } from "../utils/Result";
import { Database, DatabaseError } from "./Database";

type Result<T> = Promise<ResultType<T, MockDatabaseError>>;

export class MockDatabase implements Database {
    private users: User[] = []
    public userIdCounter = 0;

    public async doesUserWithUsernameExist(username: string): Result<boolean> {
        const user = this.users.find(user => user.username == username);
        return ok(user !== undefined)
    }
    public async addUser(user: User): Result<void> {
        this.users.push(user)
        return ok(undefined);
    }
    public async uniqueUserId(): Result<number> {
        const id = this.userIdCounter;
        this.userIdCounter += 1;
        return ok(id);
    }
    public async userById(userId: number): Result<User | null> {
        return ok(this.users.find((user) => user.id === userId) ?? null);
    }
    public async userByUsername(username: string): Result<User | null> {
        return ok(this.users.find((user) => user.username === username) ?? null);
    }
}

export class MockDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}

