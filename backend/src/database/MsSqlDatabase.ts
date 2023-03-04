import { User } from "../users/User";
import { Database } from "./Database";
import mssql, { ConnectionPool } from "mssql";

export class MsSqlDatabase implements Database {

    private connection: ConnectionPool;
    private userIdCounter = 0;

    constructor() {
        var config = {
            user: 'sa',
            password: 'mypassword',
            server: 'localhost',
            Database: 'SchoolDB'
        };

        const newConnection = new ConnectionPool(config);
        this.connection = newConnection;
    }

    async doesUserWithUsernameExist(username: string): Promise<boolean> {
        const request = new mssql.Request(this.connection);
        request.input("username", username);
        try {
            const users = await request.query("SELECT * FROM users WHERE username=@username;")
            return users.recordset.length > 0;
        } catch {
            return true;
        }
    }

    async addUser(user: User): Promise<void> {
        const request = new mssql.Request(this.connection);
        request.input("id", user.id);
        request.input("username", user.username);
        request.input("password", user.password);
        request.input("name", user.name);
        request.input("age", user.age);
        try {
            //
            await request.query(`
                INSERT INTO table_name (id, username, password, name, age);
                VALUES (@id, @username, @password, @name, @age);
            `)
        } catch {
            //
        }
    }

    async uniqueUserId(): Promise<number> {
        const id = this.userIdCounter;
        this.userIdCounter += 1;
        return id;
    }

    async isUsersPasswordCorrect(username: string, password: string): Promise<boolean> {
        const request = new mssql.Request(this.connection);
        request.input("username", username);
        request.input("password", password);
        try {
            const users = await request.query("SELECT * FROM users WHERE username=@username AND password=@password;")
            return users.recordset.length > 0;
        } catch {
            return false;
        }
    }

    async userById(userId: number): Promise<User | null> {
        const request = new mssql.Request(this.connection);
        request.input("id", userId);
        try {
            const result = await request.query("SELECT * FROM users WHERE id=@id");
            if (result.recordset.length === 0) {
                return null;
            } else if (result.recordset.length === 1) {
                return result.recordset[0];
            }
            else {
                // TODO
                throw new Error("TODO")
            }
        } catch {
            // TODO
            throw new Error("TODO")
        }
    }

    async userByUsername(username: string): Promise<User | null> {
        const request = new mssql.Request(this.connection);
        request.input("username", username);
        try {
            const result = await request.query("SELECT * FROM users WHERE username=@username");
            if (result.recordset.length === 0) {
                return null;
            } else if (result.recordset.length === 1) {
                return result.recordset[0];
            }
            else {
                // TODO
                throw new Error("TODO")
            }
        } catch {
            // TODO
            throw new Error("TODO")
        }
    }
}
