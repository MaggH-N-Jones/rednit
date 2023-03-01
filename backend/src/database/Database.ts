import { User } from "../users/User";

export interface Database {
    doesUserWithUsernameExist(username: string): Promise<boolean>;
    addUser(user: User): Promise<void>;
    uniqueUserId(): Promise<number>;
}