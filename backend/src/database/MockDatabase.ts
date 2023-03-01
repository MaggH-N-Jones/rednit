import { User } from "../users/User";
import { Database } from "./Database";

export class MockDatabase implements Database {

    private users: User[] = []
    public addMockUser(user: User) {
        this.users.push(user)
    }
    public async doesUserWithUsernameAlreadyExist(username: string): Promise<boolean> {
        const user = this.users.find(user => user.username == username);
        return user !== undefined
    }
}