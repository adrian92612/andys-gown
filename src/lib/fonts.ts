import {
  Geist,
  Geist_Mono,
  Poiret_One,
  Nanum_Myeongjo,
  Allura,
} from "next/font/google";

export const poiretOne = Poiret_One({
  variable: "--font-poiret-one",
  subsets: ["latin"],
  weight: "400",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
