"use client";
import React, { useState } from "react";
import { Slider } from "@nextui-org/react";
export default function PriceInput() {
  const [price, setPrice] = useState([200, 2000]);
  return (
    <>
      <Slider
        formatOptions={{ style: "currency", currency: "USD" }}
        step={10}
        radius="none"
        color="secondary"
        maxValue={2000}
        minValue={200}
        value={price}
        classNames={{
          filler: "bg-fuchsia-500",
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="group top-1/2 bg-fuchsia-500 cursor-grab rounded-sm data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform bg-fuchsia-500  w-5 h-5 block group-data-[dragging=true]:scale-80" />
          </div>
        )}
        onChange={setPrice as any}
        className="max-w-md"
      />
      <input hidden name="currentPrice" type="number" value={price[0]} />
      <input hidden name="buyPrice" type="number" value={price[1]} />
      <div className="flex justify-between">
        <div>${price[0]}</div>
        <div>${price[1]}</div>
      </div>
    </>
  );
}
