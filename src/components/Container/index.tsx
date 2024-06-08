import React from "react";

import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export default function Container({ children, className }: ComponentProps) {
  return (
    <div className={twMerge("max-w-[1920px] w-full mx-auto px-12 laptop:px-8 mobile_lg:px-4", className)}>
      {children}
    </div>
  );
}
