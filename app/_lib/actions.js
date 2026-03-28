"use server";

import { cookies, headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/supabase-server";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("You must be logged in to remove reservation");

  const supabase = await createSupabaseServerClient();

  const guestBookings = await getBookings(supabase, session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(supabase, bookingId);

  revalidatePath("/account/reservations");
}

export async function updateReservation(bookingId, formData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("You must be logged in to change reservation");

  const supabase = await createSupabaseServerClient();

  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  await updateBooking(supabase, bookingId, updateData);

  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("You must be logged in to create reservation");

  if (!bookingData.startDate || !bookingData.endDate)
    throw Error("You need to set the date range of your stay");

  const updateData = {
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0, // TODO
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: formData.get("hasBreakfast") === "on",
    ...bookingData,
    status: "unconfirmed",
  };

  const supabase = await createSupabaseServerClient();
  await createBooking(supabase, updateData);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
