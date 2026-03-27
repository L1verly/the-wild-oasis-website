import { getBookedDatesByCabinId, getSettings } from "@/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { createSupabaseServerClient } from "@/_lib/supabase/supabase-server";
import LoginMessage from "./LoginMessage";
import { auth } from "@/_lib/auth";
import { headers } from "next/headers";

export default async function Reservation({ cabin }) {
  const supabase = await createSupabaseServerClient();
  const [settings, bookedDates] = await Promise.all([
    getSettings(supabase),
    getBookedDatesByCabinId(supabase, cabin.id),
  ]);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ?
        <ReservationForm cabin={cabin} user={session.user} />
      : <LoginMessage cabinId={cabin.id} />}
    </div>
  );
}
