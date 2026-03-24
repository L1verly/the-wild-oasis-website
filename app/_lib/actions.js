"use server";

import { cookies, headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  const cookieStore = await cookies();
  cookieStore.delete("better-auth.session_token");

  redirect("/");
};
