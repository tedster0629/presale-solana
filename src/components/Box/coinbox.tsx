import React, { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import type { ComponentProps } from "@/types";
import BoxContainer from ".";
import ButtonContainer from "../Button";
import CoinItemBoxContainer from "./coinitembox";
import { PRICE_PER_TOKEN } from "@/utils/constants";

export interface CoinBoxProps extends ComponentProps {
    balance: number;
    max: boolean;
    text: string;
    icon: string;
    isValue: number;
    setIsValue: (value: number) => void;
}

export default function CoinBoxContainer({ balance, max, text, icon, isValue, setIsValue }: CoinBoxProps) {
    return (
        <BoxContainer className="text-md w-full p-3 flex-col ">
            <div className="flex justify-between ">
                <div className="font-bold">From</div>
                <div className="font-semibold">Balance: {balance / LAMPORTS_PER_SOL}</div>
            </div>
            {max ? <ButtonContainer text="MAX" className="rounded-3xl bg-danger py-0.5 text-xs  w-10" onClick={() => setIsValue(balance / LAMPORTS_PER_SOL)} /> : <div className="text-whitegrey">l</div>}
            <div className="flex justify-between items-center">
                <input className=" font-bold text-xl bg-transparent outline-none w-36" type="number" placeholder="0.0" onChange={(e) => setIsValue(Number(e.target.value))} value={max ? isValue : isValue / PRICE_PER_TOKEN} />
                <CoinItemBoxContainer icon={icon} text={text} />
            </div>
        </BoxContainer>
    );
}
