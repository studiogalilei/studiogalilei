import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom theme tokens from app/globals.css.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "sg",
        "sg-deep",
        "sg-bright",
        "ink",
        "pale",
        "mist",
        "cream",
        "line",
        "mk",
        "ai",
        "sw",
        "platform-ink",
        "platform-line",
        "platform-mid",
        "platform-danger",
        "platform-green",
      ],
      text: [
        ...[
          "9.5",
          "10",
          "10.5",
          "11",
          "11.5",
          "12",
          "12.5",
          "13",
          "13.5",
          "14",
          "14.5",
          "15",
          "15.5",
        ],
        ...["16", "17", "18", "19", "22"],
        ...["1.5rem", "1.6rem", "1.75rem", "2rem", "2.2rem", "2.4rem", "2.6rem", "2.8rem"],
      ],
      leading: ["1.1", "1.15", "1.65", "1.7", "1.75"],
      tracking: ["1", "1.5", "2", "3", "8", "12", "14"],
      radius: ["10", "14", "18", "20", "22"],
      shadow: ["surface-1", "surface-2", "surface-3", "surface-dark"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
