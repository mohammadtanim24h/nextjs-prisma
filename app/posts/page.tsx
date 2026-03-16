import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        // project selected fields
        select: {
            id: true,
            title: true,
            slug: true,
        },
        // pagination
        take: 10,
        skip: 0,
    });

    // get total records in table
    const postsCount = await prisma.post.count();
    return (
        <>
            <h1>All Posts ({postsCount})</h1>
            <ul className="flex flex-col gap-2">
                {posts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                ))}
            </ul>
        </>
    );
}
