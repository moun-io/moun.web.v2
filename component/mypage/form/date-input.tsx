"use client";
import { useState } from "react";

export default function DateInput() {
  function formatDate(date: Date, isHour: boolean): string {
    let year = date.getFullYear();
    let month: string = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based, add 1 to get the correct month number
    let day: string | number = date.getDate().toString().padStart(2, "0");
    let hour: string | number = date.getHours().toString().padStart(2, "0");
    let minute: string | number = date.getMinutes().toString().padStart(2, "0");

    // Pad the month and day with a leading zero if they are less than 10
    if (isHour) {
      return `${hour}:${minute}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  }

  const today = new Date();
  const threeDaysLater = new Date(today);
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);
  threeDaysLater.setDate(today.getDate() + 3);
  const [expireDate, setExpireDate] = useState(
    formatDate(threeDaysLater, false)
  ); //YYYY-MM-DDTHH:MM
  const [minDate, setMinDate] = useState(formatDate(threeDaysLater, false)); //YYYY-MM-DD
  const [maxDate, setMaxDate] = useState(formatDate(twoWeeksLater, false)); //YYYY-MM-DD
  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="date"
          value={formatDate(today, false)}
          className="bg-neutral-100 p-4 rounded-lg text-black "
          disabled
        />
        <div>~</div>
        <input
          type="date"
          name="expireDate"
          placeholder="종료일"
          onChange={(e) => setExpireDate(e.target.value)}
          value={expireDate}
          min={minDate}
          max={maxDate}
          className="bg-neutral-100 p-4 flex-none rounded-lg cursor-pointer hover:bg-neutral-200 transition text-black"
        />
      </div>
      <input
        type="time"
        name="expireTime"
        value={formatDate(today, true)}
        hidden
        readOnly
      />
    </>
  );
}
