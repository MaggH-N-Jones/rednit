export interface Database {
    doesUserWithUsernameAlreadyExist(username: string): Promise<boolean>;


}