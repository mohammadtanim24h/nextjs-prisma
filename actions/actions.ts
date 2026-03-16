"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// a server action is just a function that runs on the server. This function below is a server action. The "use server" at the top of the file tells Next.js that this file contains server actions.
export async function createPost(data: FormData) {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    // create post in database
    await prisma.post.create({
        data: {
            title,
            content,
            slug,
        },
    });

    revalidatePath("/posts"); // revalidate the /posts page to show the new post
}

export async function updatePost(data: FormData, id: number) {
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            slug,
        },
    });
}

export async function deletePost(id: number) {
    await prisma.post.delete({
        where: {
            id,
        },
    });
}
