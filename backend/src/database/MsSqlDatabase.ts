import { User } from "../users/User";
import { Database, DatabaseError } from "./Database";
import mssql, { ConnectionPool, Request } from "mssql";
import { error, ok, Result as ResultType } from "../utils/Result";
import { Session } from "../users/Session";
import { Match } from "../swiper/MatchModel";
import { request } from "http";

type Result<T> = Promise<ResultType<T, MsSqlDatabaseError>>

export class MsSqlDatabase implements Database {
    
    private connection: ConnectionPool | undefined = undefined;
    private userIdCounter = 0;
    
    public async connect() {
        //await mssql.connect("data source=PCVDATALAP108\\SQLEXPRESS2019;initial catalog=master;trusted_connection=true").catch(console.log)
        const config = {
            user: 'root',
            password: 'Merc1234',
            server: 'localhost',
            port: 1433,
            database: 'rednit',
            trustServerCertificate: true,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            }
        }
        await mssql.connect(config).catch(console.log)
        
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
        request.input("username", mssql.NVarChar, user.username);
        request.input("password", mssql.NVarChar , user.password);
        request.input("name", mssql.NVarChar , user.name);
        request.input("age", mssql.Int, user.age);
        try {
            const result = await request.query(`
                INSERT INTO [users] (username, password, name, age)
                VALUES (@username, @password, @name, @age);
            `)
            return ok(undefined);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }

    public async uniqueUserId(): Result<number> {
        const allUsers = await new Request(this.connection).query("SELECT id FROM [users]");
        let biggestId = 0;
        for (const user of allUsers.recordset)
            if (user.id > biggestId)
                biggestId = user.id
        return ok(biggestId + 1);
    }

    public async userById(userId: number): Result<User | null> {
        const request = new Request(this.connection);
        request.input("id", mssql.Int, userId);
        try {
            const result = await request.query("SELECT * FROM [users] WHERE id=@id");
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
            const result = await request.query("SELECT * FROM [users] WHERE username=@username");
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

    public async allUsersExceptWithId(id: number): Result<User[]> {
        const request = new Request(this.connection);
        request.input("id", id)
        try {
            const result = await request.query("SELECT * FROM [users] WHERE id!=@id");
                return ok(result.recordset);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
    }
    public async addSession(session: Session): Promise<ResultType<void, DatabaseError>> {
       
        const request = new Request(this.connection);
        request.input("userId", mssql.Int, session.userId);
        request.input("token", mssql.NVarChar , session.token);
        
        try {
            const result = await request.query(`
                INSERT INTO [sessions] (userId, token)
                VALUES (@userId, @token);
            `)
            return ok(undefined);
        } catch {
            return error(new MsSqlDatabaseError("mssql failure"));
        }
        
    }
    public async uniqueSessionId(): Promise<ResultType<number, DatabaseError>> {
        const allSessions = await new Request(this.connection).query("SELECT id FROM [sessions]");
        let biggestId = 0;
        for (const session of allSessions.recordset)
            if (session.id > biggestId)
                biggestId = session.id
        return ok(biggestId + 1);
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

