import { User } from "../users/User";

export interface Database {
    doesUserWithUsernameExist(username: string): Promise<boolean>;
    addUser(user: User): Promise<void>;
    uniqueUserId(): Promise<number>;
    userById(userId: number): Promise<User | null>
    userByUsername(username: string): Promise<User | null>
}
