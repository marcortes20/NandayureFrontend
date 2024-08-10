"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-7">
      <button onClick={() => signIn()}>Iniciar sesion</button>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
    </div>
  );
}
