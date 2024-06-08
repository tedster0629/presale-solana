import React from "react";

import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export default function BoxContainer({ children, className }: ComponentProps) {
    return (
        <div className={twMerge("flex gap-2 flex-col bg-whitegrey rounded-2xl ", className)}>
            {children}
        </div>
    );
}
