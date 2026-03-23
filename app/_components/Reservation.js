import { getBookedDatesByCabinId, getSettings } from "@/_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { createSupabaseServerClient } from "@/_lib/supabase";

export default async function Reservation({ cabin }) {
  const supabase = await createSupabaseServerClient();
  const [settings, bookedDates] = await Promise.all([
    getSettings(supabase),
    getBookedDatesByCabinId(supabase, cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
