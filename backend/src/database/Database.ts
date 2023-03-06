import { Match } from "../swiper/MatchModel";
import { Session } from "../users/Session";
import { User } from "../users/User";
import { Result as ResultType } from "../utils/Result";

type Result<T> = Promise<ResultType<T, DatabaseError>>

export interface Database {
    userWithUsernameExist(username: string): Result<boolean>;
    addUser(user: User): Result<void>;
    uniqueUserId(): Result<number>;
    userById(userId: number): Result<User | null>;
    userByUsername(username: string): Result<User | null>;
    allUsersExceptWithId(id: number): Result<User[]>;

    addSession(session: Session): Result<void>;
    uniqueSessionId(): Result<number>;
    sessionByToken(token: string): Result<Session | null>;

    addMatch(match: Match): Result<void>;
    uniqueMatchId(): Result<number>;
}

export interface DatabaseError {
    message(): string;
}

