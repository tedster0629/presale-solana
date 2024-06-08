import React from "react";

import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export default function CardContainer({ children, className }: ComponentProps) {
    return (
        <div className={twMerge("flex flex-col gap-6 bg-grey max-w-[700px] w-full  rounded-3xl py-6 px-10  justify-between", className)}>
            {children}
        </div>
    );
}
