import { api } from "./api/api";
import { MockDatabase } from "./database/MockDatabase";
import { MsSqlDatabase } from "./database/MsSqlDatabase";
import { PrismaDatabase } from "./database/PrismaDatabase";

async function main() {
    const db = new MockDatabase();
    api(db);
}


main()
