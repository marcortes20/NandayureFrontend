"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  console.log(session, status);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </button>
    </>
  );
}
