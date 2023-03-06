import { User } from "../users/User";
import { Database, DatabaseError } from "./Database";
import mssql, { ConnectionPool, Request } from "mssql";
import { error, ok, Result as ResultType } from "../utils/Result";
import { Session } from "../users/Session";
import { Match } from "../swiper/MatchModel";

type Result<T> = Promise<ResultType<T, MsSqlDatabaseError>>

export class MsSqlDatabase implements Database {

    private connection: ConnectionPool | undefined = undefined;
    private userIdCounter = 0;

    public async connect() {
        //await mssql.connect("data source=PCVDATALAP108\\SQLEXPRESS2019;initial catalog=master;trusted_connection=true").catch(console.log)
        await mssql.connect("Server=localhost,1433;Database=database;User Id=mhhv.skp;Password=Merc123456;Encrypt=false").catch(console.log)
    }

    public async userWithUsernameExist(username: string): Result<boolean> {
        const request = new Request(this.connection);
        request.input("username", username);
        try {
            const users = await request.query("SELECT * FROM users WHERE username=@username;")
            return ok(users.recordset.length > 0);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async addUser(user: User): Result<void> {
        const request = new Request(this.connection);
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
        const request = new Request(this.connection);
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
        const request = new Request(this.connection);
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
        const request = new Request(this.connection);
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

    public async addMatch(match: Match): Promise<ResultType<void, DatabaseError>> {
        throw new Error("not implemented")
    }
    public async uniqueMatchId(): Promise<ResultType<number, DatabaseError>> {
        throw new Error("not implemented")
    }
}

export class MsSqlDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}

