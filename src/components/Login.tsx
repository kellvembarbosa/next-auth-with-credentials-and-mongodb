import {
    useSession, signIn, signOut
} from 'next-auth/client'
import Link from "next/link";

export default function Login() {
    const [session, loading] = useSession()
    if (session) {
        return <>
            Signed in as {session.user.email} <br /><br />
            <Link href="/profile" > Ver perfil </Link><br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    }
    return <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
    </>
}