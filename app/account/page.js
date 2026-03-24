import { auth } from "@/_lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return <div>Welcome, {session.user.name}</div>;
}
