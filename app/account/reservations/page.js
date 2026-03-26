import Link from "next/link";
import { createSupabaseServerClient } from "@/_lib/supabase/supabase-server";
import { getBookings } from "@/_lib/data-service";
import { auth } from "@/_lib/auth";
import { headers } from "next/headers";
import ReservationList from "@/_components/ReservationList";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const supabase = await createSupabaseServerClient();
  const bookings = await getBookings(supabase, session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ?
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      : <ReservationList bookings={bookings} />}
    </div>
  );
}
