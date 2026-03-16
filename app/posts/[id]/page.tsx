import prisma from "@/lib/prisma";

export default async function Post({
    params,
}: {
    params: Promise<{ id: String }>;
}) {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    return (
        <>
            <h1>{post?.title}</h1>
            <p>{post?.content}</p>
        </>
    );
}
