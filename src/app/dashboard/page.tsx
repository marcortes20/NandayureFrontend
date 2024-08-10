"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="w-screen flex gap-5 justify-center">
        <button className="border rounded" onClick={() => signOut()}>
          Cerrar sesion
        </button>
        <button
          className="border rounded"
          onClick={() => router.push("/admin")}
        >
          Admin page
        </button>
      </div>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
}
