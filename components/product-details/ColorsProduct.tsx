import { Color } from "@/@types/api/product";
import React, { useState } from "react";

export default function ColorsProduct({
  colors,
  setColor,
  color
}: {
  colors: Color[],
  color: Color
  setColor: React.Dispatch<React.SetStateAction<Color>>
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg md:text-xl font-bold">Color</h2> 
      <div className="flex select-none flex-wrap items-center gap-1">
        {colors.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              name="color"
              value={item.id}
              checked={color.id === item.id} // نتحكم في الاختيار عن طريق الـ state
              onChange={() => setColor(item)} // لما يتغير الاختيار، نحدث الـ state
              className="peer sr-only"
            />
            <p
              className="peer-checked:ring-2 peer-checked:ring-primary size-6"
              style={{ backgroundColor: item.color_code }}
            ></p>
          </label>
        ))}
      </div>
    </div>
  );
}