import { User } from "../users/User";
import { Result as ResultType } from "../utils/Result";

type Result<T> = Promise<ResultType<T, DatabaseError>>

export interface Database {
    doesUserWithUsernameExist(username: string): Result<boolean>;
    addUser(user: User): Result<void>;
    uniqueUserId(): Result<number>;
    userById(userId: number): Result<User | null>;
    userByUsername(username: string): Result<User | null>;
}

export interface DatabaseError {
    message(): string;
}

