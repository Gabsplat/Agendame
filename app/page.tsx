import { signIn } from "@/auth";

export default function Home() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/test" });
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
