import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
    const posts = await prisma.post.findMany();
    return (
        <>
            <h1>All Posts ({posts.length})</h1>
            <ul>
                {posts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                ))}
            </ul>
        </>
    );
}
