import Image from "next/image"
import { redirect } from "next/navigation"

import UserCard from "@/components/cards/UserCard"
import { fetchUser } from "@/lib/actions/user.actions"
import { fetchCommunities } from "@/lib/actions/community.actions"

// third party
import { currentUser } from "@clerk/nextjs"
import CommunityCard from "@/components/cards/CommunityCard"
import Community from "./../../../lib/models/community.model"

async function Page() {
    const user = await currentUser()

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect("/onboarding")

    // fetch users
    const results = await fetchCommunities({
        searchString: "",
        pageNumber: 1,
        pageSize: 25
    })
    return (
        <section>
            <h1 className=" head-text mb-10">Search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {!results.communities?.length ? (
                    <p className="no-results">No communities</p>
                ) : (
                    <>
                        {results.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page
