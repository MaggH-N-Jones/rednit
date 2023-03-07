import { api } from "./api/api";
import { MockDatabase } from "./database/MockDatabase";
import { MsSqlDatabase } from "./database/MsSqlDatabase";
import { PrismaDatabase } from "./database/PrismaDatabase";

async function main() {
    const database = new PrismaDatabase();
    //await database.connect();
    //api(database)
    database.addUser({
        id: 100,
        name: "hej",
        username: "hej",
        password: "hej",
        age: 69,
    })
    let user = await database.userById(100);
    console.log(user)
}

main()
