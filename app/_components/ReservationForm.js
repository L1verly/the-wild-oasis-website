"use client";

import Image from "next/image";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/_lib/actions";
import SubmitFormButton from "./SubmitFormButton";
import { setLocalHoursToUTCOffset } from "@/_lib/utils";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = setLocalHoursToUTCOffset(range?.from);
  const endDate = setLocalHoursToUTCOffset(range?.to);

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * regularPrice - discount;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithBookingData = createReservation.bind(
    null,
    bookingData,
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full"
            width={32}
            height={32}
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createReservationWithBookingData}
        action={async (formData) => {
          await createReservationWithBookingData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="hasBreakfast">Would you like to add breakfast?</label>
          <input
            type="checkbox"
            name="hasBreakfast"
            id="hasBreakfast"
            className="size-6 accent-accent-500"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {startDate && endDate ?
            <SubmitFormButton pendingText={"Reserving..."}>
              Reserve now
            </SubmitFormButton>
          : <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          }
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
