import { Match } from "../swiper/MatchModel";
import { Session } from "../users/Session";
import { User } from "../users/User";
import { ok, Result as ResultType } from "../utils/Result";
import { Database, DatabaseError } from "./Database";

type Result<T> = Promise<ResultType<T, MockDatabaseError>>;

export class MockDatabase implements Database {
    private users: User[] = []
    public userIdCounter = 0;

    private sessions: Session[] = [];
    public sessionIdCounter = 0;

    private matches: Match[] = [];
    public matchIdCounter = 0;

    public async userWithUsernameExist(username: string): Result<boolean> {
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
    public async allUsersExceptWithId(id: number): Promise<ResultType<User[], DatabaseError>> {
        return ok(this.users.filter((user) => user.id !== id));
    }

    public async addSession(session: Session): Result<void> {
        this.sessions.push(session);
        return ok(undefined);
    }
    public async uniqueSessionId(): Result<number> {
        return ok(this.sessionIdCounter++);
    }
    public async sessionWithUserIdExists(userId: number): Result<boolean> {
        return ok(this.sessions.find((session) => session.userId === userId) !== undefined);
    }
    public async sessionByToken(token: string): Promise<ResultType<Session | null, DatabaseError>> {
        return ok(this.sessions.find((session) => session.token === token) ?? null);
    }
    public async sessionWithTokenExists(token: string): Result<boolean> {
        return ok(this.sessions.find((session) => session.token === token) !== undefined);
    }

    public async addMatch(match: Match): Promise<ResultType<void, DatabaseError>> {
        this.matches.push(match);
        return ok(undefined);
    }
    public async uniqueMatchId(): Promise<ResultType<number, DatabaseError>> {
        return ok(this.matchIdCounter++);
    }
    public async matchesBySwiperId(swiperId: number): Result<Match[]> {
        return ok(this.matches.filter((match) => match.swiper === swiperId));
    }
}

export class MockDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}

