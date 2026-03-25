import { getBookedDatesByCabinId, getCabin } from "@/_lib/data-service";
import { createSupabaseServerClient } from "@/_lib/supabase/supabase-server";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const supabase = await createSupabaseServerClient();
    const [cabin, bookedDates] = await Promise.all([
      getCabin(supabase, cabinId),
      getBookedDatesByCabinId(supabase, cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin not found" });
  }
}
