import { getCabins } from "@/_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList() {
  const cabins = await getCabins();

  if (cabins.length < 0) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  else if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxcapacity <= 3);
  else if (filter === "medium")
    displayedCabins = cabins.filter((cabin) => cabin.maxcapacity <= 7);
  else if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxcapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
