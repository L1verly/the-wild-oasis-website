"use server";

import { cookies, headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/supabase-server";
import { updateGuest } from "./data-service";

export const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  const cookieStore = await cookies();
  cookieStore.delete("better-auth.session_token");

  redirect("/");
};

export async function updateProfile(formData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("You must be logged in to update profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalIdRegex = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIdRegex.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const supabase = await createSupabaseServerClient();
  await updateGuest(supabase, session.user.guestId, updateData);
}
