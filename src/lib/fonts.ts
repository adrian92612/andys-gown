import { Nanum_Myeongjo, Allura } from "next/font/google";

export const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
});
