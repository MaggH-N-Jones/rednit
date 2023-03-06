import { api } from "./api/api";
import { MockDatabase } from "./database/MockDatabase";

function main() {
    const mockdb = new MockDatabase
    api(mockdb)
}

main()