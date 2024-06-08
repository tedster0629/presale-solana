import React from "react";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export interface CoinItemBoxProps extends ComponentProps {
    icon: string;
    text: string;
}

export default function CoinItemBoxContainer({ className, icon, text }: CoinItemBoxProps) {
    return (
        <div className={twMerge("bg-[#C1CFD7] rounded-full", className)}>
            <div className="flex gap-2 justify-center items-center px-3 py-1.5 font-black">
                <Image src={icon} width={25} height={25} alt="icons" />
                <div>{text}</div>
            </div>
        </div>
    );
}
