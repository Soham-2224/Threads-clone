import { redirect } from "next/navigation"

import { fetchUser } from "@/lib/actions/user.actions"

// third party
import { currentUser } from "@clerk/nextjs"

// components
import PostThread from "@/components/forms/PostThread"

async function Page() {
    const user = await currentUser()

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect("/onboarding")

    return (
        <>
            <h1 className="head-text">Create thread</h1>

            <PostThread userId={userInfo._id} />
        </>
    )
}

export default Page
