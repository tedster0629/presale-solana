import { Finger_Paint, Inter, Jolly_Lodger } from "next/font/google";

export const fingerFont = Finger_Paint({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-finger_paint",
    weight: '400'
});
export const interFont = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const jollyFont = Jolly_Lodger({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jolly_lodger",
    weight: '400'
});