import React from "react";

import { twMerge } from "tailwind-merge";

import type { ComponentProps } from "@/types";

export interface CoinBoxProps extends ComponentProps {
    value: number;
}

export default function ProgressContainer({ children, className, value }: CoinBoxProps) {

    return (
        <div className={twMerge("relative shadow w-full bg-grey-light mt-2 bg-[#CCCCCC] rounded-2xl h-7 font-extrabold", className)}>
            <div className={`absolute bg-teal text-xs text-center text-white bg-danger rounded-2xl rounded-e-none h-7 z-20`} style={{ width: `${value}%` }}>
                <div className="absolute -top-8 -right-4 rounded-full w-10 h-10 bg-danger flex items-center justify-center" >
                    {value}%
                </div>
            </div>
            <div className="absolute bg-teal text-xs text-center w-[25%] rounded-2xl rounded-e-none h-7" >
                <div className="absolute -top-8 right-0 flex flex-col items-end ">
                    25%
                    <div className="w-1 h-5 bg-black right-0"></div>
                </div>
            </div>
            <div className="absolute  bg-teal text-xs text-center  w-[50%] rounded-2xl rounded-e-none h-7  " >
                <div className="absolute -top-8 right-0 flex flex-col items-center ">
                    50%
                    <div className="w-1 h-5 bg-black right-0"></div>
                </div>
            </div>
            <div className="absolute  bg-teal text-xs text-center w-[75%]  rounded-2xl rounded-e-none h-7  " >
                <div className="absolute -top-8 right-0">
                    75%
                    <div className="w-1 h-5 bg-black right-0"></div>
                </div>
            </div>
        </div >
    );
}
