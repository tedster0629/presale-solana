import React from "react";

import type { ComponentProps } from "@/types";
import BoxContainer from ".";

interface Count {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface DateBoxProps extends ComponentProps {
    count: Count;
}

export default function DateBoxContainer({ count }: DateBoxProps) {
    return (
        <BoxContainer className="flex-row justify-between p-6 font-bold flex-wrap">
            <div className="flex flex-col gap-2 items-center">
                <div className="text-danger  text-4xl">{count.days}</div>
                <div>Days</div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="text-danger text-4xl">{count.hours}</div>
                <div>Hours</div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="text-danger  text-4xl">{count.minutes}</div>
                <div>Minutes</div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <div className="text-danger  text-4xl">{count.seconds}</div>
                <div>Seconds</div>
            </div>
        </BoxContainer>
    );
}
