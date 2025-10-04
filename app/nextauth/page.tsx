"use client"
import { signIn, signOut,useSession} from "next-auth/react"
// import { useRouter } from "next/router";

 const NextAuthPage = () => {
    const {data:session} = useSession();
    console.log(session)
// if(!session){
//     console.log("no session")
//     return<></>
// }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">NextAuth.js Example</h1>
            <div className="space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer" onClick={() => signIn()}>Sign In</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer" onClick={() => signOut()}>Sign Out</button>
                {/* { Object.keys(session?.user).map((key) => (
                    <div key={key}>
                        <strong>{key}:</strong> {session.user?.[key] ?? ""}
                    </div>
                ))} */}
            </div>
        </div>
    )
}
export default NextAuthPage;