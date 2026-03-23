import Cabin from "@/_components/Cabin";
import Reservation from "@/_components/Reservation";
import Spinner from "@/_components/Spinner";
import { getCabin, getCabins } from "@/_lib/data-service";
import {
  createSupabaseFrontendClient,
  createSupabaseServerClient,
} from "@/_lib/supabase";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const supabase = createSupabaseFrontendClient();

  const { name } = await getCabin(supabase, params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const supabase = createSupabaseFrontendClient();

  const cabins = await getCabins(supabase);

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const supabase = await createSupabaseServerClient();

  const cabin = await getCabin(supabase, params.cabinId);

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
