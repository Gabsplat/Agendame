"use client";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session?.user?.name) {
    return (
      <div>
        <p>You are {session?.user?.name}, welcome!</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <p>You are not authorized to view this page!</p>;
}
