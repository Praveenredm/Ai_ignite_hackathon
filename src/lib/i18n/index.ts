import { en } from "./en";
import { ta } from "./ta";

export const languages = {
  en,
  ta,
};

export type Lang = keyof typeof languages;
