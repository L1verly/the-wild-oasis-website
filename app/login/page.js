import SignInButton from "@/_components/SignInButton";
import { auth } from "@/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
};

export default async function Page({ searchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/account");
  }
  const returnTo = searchParams.returnTo || "/account";

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton returnTo={returnTo} />
    </div>
  );
}
