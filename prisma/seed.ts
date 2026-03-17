import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: "New Post",
        slug: "new-post",
        content: "This is a new post",
        author: {
            connectOrCreate: {
                where: {
                    email: "ben@test.com",
                },
                create: {
                    email: "ben@test.com",
                    hashedPassword: "fdsaklfsdkalfkl12kl3klj",
                },
            },
        },
    },
];

export async function main() {
    for (const p of initialPosts) {
        await prisma.post.create({ data: p });
    }
}

main();
