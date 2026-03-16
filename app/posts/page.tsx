import { createPost } from "@/actions/actions";
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
        <div className="p-5">
            <h1>All Posts ({postsCount})</h1>
            <ul className="flex flex-col gap-2 mb-5">
                {posts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                ))}
            </ul>

            <form action={createPost} className="flex flex-col gap-2 lg:w-84">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
