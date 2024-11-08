import { SessionProvider } from "next-auth/react";

export default function Administrator({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
