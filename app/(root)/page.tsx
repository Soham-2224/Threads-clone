import { currentUser } from "@clerk/nextjs"
import { fetchPosts } from "@/lib/actions/thread.action"
import User from "@/lib/models/user.model"
import ThreadCard from "@/components/cards/ThreadCard"

export default async function Home() {
    const result = await fetchPosts(1, 30)
    const user = await currentUser()

    // console.log(result)

    return (
        <>
            <h1 className=" head-text text-left">Home</h1>

            <section className="mt-9 flex flex-col gap-10">
                {!result.posts.length ? (
                    <p className=" no-result">No threads found</p>
                ) : (
                    <>
                        {result.posts.map((post) => (
                            <ThreadCard
                                key={post._id}
                                id={post._id}
                                currentUserId={user?.id || ""}
                                parentId={post.parentId}
                                content={post.text}
                                author={post.author}
                                community={post.community}
                                createdAt={post.createdAt}
                                comments={post.children}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    )
}
