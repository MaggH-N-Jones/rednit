import { User } from "../users/User";
import { Database, DatabaseError } from "./Database";
import { error, ok, Result as ResultType } from "../utils/Result";
import { Session } from "../users/Session";
import { Match } from "../swiper/MatchModel";
import { PrismaClient } from '@prisma/client'

type Result<T> = Promise<ResultType<T, PrismaDatabaseError>>

export class PrismaDatabase implements Database {
    private client: PrismaClient;

    public constructor() {
        this.client = new PrismaClient();
    }


    public async userWithUsernameExist(username: string): Result<boolean> {
        try {
            const user = await this.client.users.findFirst({
                where: {
                    username: {
                        equals: username,
                    },
                },
            });
            return ok(user !== null);
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async addUser(user: User): Result<void> {
        try {
            await this.client.users.create({
                data: user,
            })
            return ok(undefined);
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async uniqueUserId(): Result<number> {
        try {
            const allUsers = await this.client.users.findMany({});
            let nextId = 0;
            for (const user of allUsers)
                if (nextId <= user.id)
                    nextId = user.id + 1;
            return ok(nextId)
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async userById(userId: number): Result<User | null> {
        try {
            return ok(await this.client.users.findFirst({
                where: {
                    id: {
                        equals: userId,
                    },
                },
            }))
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async userByUsername(username: string): Result<User | null> {
        try {
            return ok(await this.client.users.findFirst({
                where: {
                    username: {
                        equals: username,
                    },
                },
            }))
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async allUsersExceptWithId(id: number): Result<User[]> {
        try {
            return ok(await this.client.users.findMany({
                where: {
                    id: {
                        not: {
                            equals: id,
                        },
                    },
                },
            }))
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }
    public async addSession(session: Session): Result<void> {
        try {
            await this.client.sessions.create({
                data: session,
            })
            return ok(undefined)
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }
    public async uniqueSessionId(): Result<number> {
        try {
            const allSessions = await this.client.sessions.findMany({});
            let nextId = 0;
            for (const session of allSessions)
                if (nextId <= session.id)
                    nextId = session.id + 1;
            return ok(nextId)
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }
    public async sessionByToken(token: string): Result<Session | null> {
        try {
            return ok(await this.client.sessions.findFirst({
                where: {
                    token: {
                        equals: token,
                    }
                }
            }))
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }

    public async addMatch(match: Match): Result<void> {
        try {
            await this.client.matches.create({
                data: match,
            })
            return ok(undefined);
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }
    public async uniqueMatchId(): Result<number> {
        try {
            const allMatches = await this.client.matches.findMany({});
            let nextId = 0;
            for (const match of allMatches)
                if (nextId <= match.id)
                    nextId = match.id + 1;
            return ok(nextId)
        } catch {
            return error(new PrismaDatabaseError("prisma failed"))
        }
    }
}

export class PrismaDatabaseError implements DatabaseError {
    public constructor(private messageText: string) { }

    public message(): string {
        return this.messageText;
    }
}