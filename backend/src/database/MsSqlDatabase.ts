import { User } from "../users/User";
import { Database, DatabaseError } from "./Database";
import { ConnectionPool, Request as SqlRequest } from "mssql";
import { error, ok, Result as ResultType } from "../utils/Result";
import { Session } from "../users/Session";

type Result<T> = Promise<ResultType<T, MsSqlDatabaseError>>

export class MsSqlDatabase implements Database {

    private connection: ConnectionPool;
    private userIdCounter = 0;

    public constructor() {
        var config = {
            user: 'sa',
            password: 'mypassword',
            server: 'localhost',
            Database: 'SchoolDB'
        };

        const newConnection = new ConnectionPool(config);
        this.connection = newConnection;
    }

    public async userWithUsernameExist(username: string): Result<boolean> {
        const request = new SqlRequest(this.connection);
        request.input("username", username);
        try {
            const users = await request.query("SELECT * FROM users WHERE username=@username;")
            return ok(users.recordset.length > 0);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async addUser(user: User): Result<void> {
        const request = new SqlRequest(this.connection);
        request.input("id", user.id);
        request.input("username", user.username);
        request.input("password", user.password);
        request.input("name", user.name);
        request.input("age", user.age);
        try {
            await request.query(`
                INSERT INTO table_name (id, username, password, name, age);
                VALUES (@id, @username, @password, @name, @age);
            `)
            return ok(undefined);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async uniqueUserId(): Result<number> {
        const id = this.userIdCounter;
        this.userIdCounter += 1;
        return ok(id);
    }

    public async isUsersPasswordCorrect(username: string, password: string): Result<boolean> {
        const request = new SqlRequest(this.connection);
        request.input("username", username);
        request.input("password", password);
        try {
            const users = await request.query("SELECT * FROM users WHERE username=@username AND password=@password;")
            return ok(users.recordset.length > 0);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async userById(userId: number): Result<User | null> {
        const request = new SqlRequest(this.connection);
        request.input("id", userId);
        try {
            const result = await request.query("SELECT * FROM users WHERE id=@id");
            if (result.recordset.length === 0)
                return ok(null);
            else if (result.recordset.length === 1)
                return ok(result.recordset[0]);
            else
                return error(new MsSqlDatabaseError("multiple users with same id"));
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async userByUsername(username: string): Result<User | null> {
        const request = new SqlRequest(this.connection);
        request.input("username", username);
        try {
            const result = await request.query("SELECT * FROM users WHERE username=@username");
            if (result.recordset.length === 0)
                return ok(null);
            else if (result.recordset.length === 1)
                return ok(result.recordset[0]);
            else
                return error(new MsSqlDatabaseError("multiple users with same username"));
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async allUsersExceptWithId(id: number): Promise<ResultType<User[], DatabaseError>> {
        throw new Error("not implemented")
    }
    public async addSession(session: Session): Promise<ResultType<void, DatabaseError>> {
        throw new Error("not implemented")
    }
    public async uniqueSessionId(): Promise<ResultType<number, DatabaseError>> {
        throw new Error("not implemented")
    }
    public async sessionByToken(token: string): Promise<ResultType<Session | null, DatabaseError>> {
        throw new Error("not implemented")
    }
}

export class MsSqlDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}

