import { api } from "./api/api";
import { MockDatabase } from "./database/MockDatabase";
import { MsSqlDatabase } from "./database/MsSqlDatabase";

async function main() {
    const database = new MsSqlDatabase();
    await database.connect();
    api(database)
    database.addUser({
        id: 100,
        name: "hej",
        username: "hej",
        password: "hej",
        age: 69,
    })
    let user = await database.userById(100);
    if (!user.ok) {
        throw user.error;
    }
}

main()