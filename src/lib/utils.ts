import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function restrictWholeNumberInput(
  e: React.KeyboardEvent<HTMLInputElement>
) {
  const invalidKeys = ["e", ".", ",", "-"];

  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
}

export function sanitizeWholeNumberOnBlur(
  e: React.FocusEvent<HTMLInputElement>
) {
  const raw = e.currentTarget.value;
  const cleaned = raw.replace(/^0+(?=\d)/, ""); // remove leading zeroes but keep "0"
  e.currentTarget.value = cleaned;
}
