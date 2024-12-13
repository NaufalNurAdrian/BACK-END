import { PrismaClient } from "../prisma/generate/client";

export default new PrismaClient({ log: ["query", "warn", "info", "error"] })
