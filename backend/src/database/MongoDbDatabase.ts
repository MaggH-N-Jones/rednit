import { User } from "../users/User";
import { Database, DatabaseError } from "./Database";
import { error, ok, Result as ResultType } from "../utils/Result";
import { Session } from "../users/Session";
import { Match } from "../swiper/MatchModel";
import { Collection, Db as MongoDb, MongoClient } from "mongodb";

type Result<T> = Promise<ResultType<T, MongoDbDatabaseError>>

export class PrismaDatabase implements Database {
    private client: MongoClient;
    private db!: MongoDb
    private users!: Collection<User>;
    private sessions!: Collection<Session>;
    private matches!: Collection<Match>;

    public constructor() {
        this.client = new MongoClient("mongodb://user:1234@localhost:27017/rednit");
    }

    public async connect() {
        await this.client.connect();
        this.db = this.client.db("rednit");
        this.users = this.db.collection<User>("users");
        this.sessions = this.db.collection<Session>("sessions");
        this.matches = this.db.collection<Match>("matches");
    }

    public async userWithUsernameExist(username: string): Result<boolean> {
        try {
            const user = await this.users.findOne({
                username: username,
            })
            return ok(user !== null);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async addUser(user: User): Result<void> {
        try {
            this.users.insertOne(user);
            return ok(undefined);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async uniqueUserId(): Result<number> {
        try {
            const users = await this.users.find({}).project({
                id: true,
            }).toArray();
            let biggestId = 0;
            for (const user of users)
                if (biggestId < user.id)
                    biggestId = user.id;
            return ok(biggestId + 1);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async userById(userId: number): Result<User | null> {
        try {
            return ok(await this.users.findOne({ id: userId }));
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async userByUsername(username: string): Result<User | null> {
        try {
            return ok(await this.users.findOne({ username: username }));
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async allUsersExceptWithId(id: number): Result<User[]> {
        try {
            return ok(await this.users.find({ id: { $ne: id } }).toArray());
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }
    public async addSession(session: Session): Result<void> {
        try {
            await this.sessions.insertOne(session);
            return ok(undefined);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }
    public async uniqueSessionId(): Result<number> {
        try {
            const sessions = await this.sessions.find({}).project({
                id: true,
            }).toArray();
            let biggestId = 0;
            for (const session of sessions)
                if (biggestId < session.id)
                    biggestId = session.id;
            return ok(biggestId + 1);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }
    public async sessionByToken(token: string): Result<Session | null> {
        try {
            return ok(await this.sessions.findOne({ token: token }))
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }

    public async addMatch(match: Match): Result<void> {
        try {
            await this.matches.insertOne(match);
            return ok(undefined);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }
    public async uniqueMatchId(): Result<number> {
        try {
            const matches = await this.matches.find({}).project({
                id: true,
            }).toArray();
            let biggestId = 0;
            for (const match of matches)
                if (biggestId < match.id)
                    biggestId = match.id;
            return ok(biggestId + 1);
        } catch {
            return error(new MongoDbDatabaseError("mongodb failed"))
        }
    }
}

export class MongoDbDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}
