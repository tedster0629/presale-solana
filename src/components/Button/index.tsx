
import React from "react";

import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export interface CoinBoxProps extends ComponentProps {
    text: string;
    onClick: () => void
}

export default function ButtonContainer({ children, className, text, onClick }: CoinBoxProps) {
    return (
        <div className={twMerge("bg-danger rounded-full text-white  active:bg-red-500 cursor-pointer box-border text-center font-700", className)} onClick={onClick} >
            <div>{text}</div>
        </div>
    );
}
