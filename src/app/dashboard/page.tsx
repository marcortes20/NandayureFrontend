'use client'

import ButtonAuth from "@/components/ui/ButtonAuth";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    console.log(session);
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                <code>{JSON.stringify(session, null, 2)}</code>
            </pre>
            <ButtonAuth />
        </div>
    )
}