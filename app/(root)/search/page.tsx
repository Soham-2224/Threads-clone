import Image from "next/image"
import { redirect } from "next/navigation"

import UserCard from "@/components/cards/UserCard"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"

// third party
import { currentUser } from "@clerk/nextjs"

async function Page() {
    const user = await currentUser()

    if (!user) return null

    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect("/onboarding")

    // fetch users
    const results = await fetchUsers({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25
    })
    return (
        <section>
            <h1 className=" head-text mb-10">Search</h1>

            <div className="mt-14 flex flex-col gap-9">
                {!results.users?.length ? (
                    <p className="no-results">No users</p>
                ) : (
                    <>
                        {results.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType="User"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    )
}

export default Page
