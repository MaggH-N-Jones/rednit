import { api } from "./api/api";
import { MockDatabase } from "./database/MockDatabase";
import { MsSqlDatabase } from "./database/MsSqlDatabase";
//import { PrismaDatabase } from "./database/PrismaDatabase";
import dotenv from "dotenv"
import { createToken } from "typescript";
import { login, LoginRequest } from "./users/login";


async function main() {
    dotenv.config()
    const database = new MsSqlDatabase();
    await database.connect();
    api(database)
    const request: LoginRequest = {
        username: "hej",
        password: "hej",
    }
    const loginResponse = await login(request, database)
    const sessionResult = await database.uniqueSessionId()
    if (!sessionResult.ok)
        throw new Error("could not get id");
    if (!loginResponse.ok) 
        throw 0;
    database.addSession({
        id: sessionResult.value,
        userId: 15,
        token: loginResponse.token,
    })
    let session = await database.sessionByToken(loginResponse.token);
    console.log(session)

}

main().catch((error) => console.error(error))
