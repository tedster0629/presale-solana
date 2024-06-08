"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import CoinBoxContainer from "@/components/Box/coinbox";
import DateBoxContainer from "@/components/Box/datebox";
import ButtonContainer from "@/components/Button";
import CardContainer from "@/components/Card";
import ProgressContainer from "@/components/Progress";
import usePresale from "@/hook/usePresale";
import { BUYER_HARDCAP, BUYER_SOFTCAP, BUYER_TOKEN_HARDCAP, PRESALE_AUTHORITY, PRICE_PER_TOKEN, TOKEN_DECIMAL, TOKEN_PRESALE_HARDCAP } from "@/utils/constants";
import { toast } from "react-toastify";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const { createPresale, startTime, endTime, updatePresale, buyToken, depositToken, claimToken, withdrawToken, buyAmount, totalBuyAmount, withdrawSol
  } = usePresale();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isValue, setIsValue] = useState(0);
  const [isClaim, setIsClaim] = useState(false);
  const [remainBuyAmount, setRemainBuyAmount] = useState(BUYER_TOKEN_HARDCAP);

  const onCreatePresale = async (start: Date, end: Date) => {
    await createPresale(start, end);
  }

  const onUpdatePresale = async (start: Date, end: Date) => {
    await updatePresale(start, end);
  }

  const onDepositToken = async () => {
    await depositToken();
  }
  const onClaimToken = async () => {
    await claimToken();
  }

  const onWithdrawToken = async () => {
    await withdrawToken();
  }

  const onWithdrawSol = async () => {
    await withdrawSol()
  }

  const onBuyToken = async () => {
    if (isValue < BUYER_SOFTCAP || isValue > BUYER_HARDCAP) {
      toast.warning("Please check SOL balance again.");
      return;
    }
    buyToken(isValue, isValue / PRICE_PER_TOKEN);
  };


  const [count, setCount] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setRemainBuyAmount(BUYER_TOKEN_HARDCAP - buyAmount / 10 ** TOKEN_DECIMAL);
  }, [buyAmount, publicKey]);

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    } else {
      setBalance(0);
    }
  }, [publicKey, connection, balance]);

  useEffect(() => {
    if (!publicKey) setIsClaim(false);
  }, [publicKey]);

  useEffect(() => {
    const startDate: any = new Date(startTime * 1000);
    const now: any = new Date();
    const endDate: any = new Date(endTime * 1000);
    if (startDate < now) {
      const intervalId = setInterval(() => {
        const distance = endDate - now;
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setCount({ days, hours, minutes, seconds });
        } else {
          setIsClaim(true)
        }
      }, 1000); // 1000ms = 1 second
      return () => clearInterval(intervalId);
    }

  }, [count, endTime, startTime, publicKey]);


  return (
    <main className="flex flex-col items-center justify-between h-full w-full mt-20 max-w-[1500px] gap-32">
      <div className="flex w-full items-start justify-between  desktop_sm:flex-col desktop_sm:items-center gap-5 ">
        <CardContainer>
          <div className="font-bold">{isClaim && " Successfully presale has ended!"}</div>
          <DateBoxContainer count={count} />
          <div className="flex justify-between w-full items-center h-28 tablet_sm:flex-col tablet_sm:items-start">
            <div className="flex flex-col ">
              <div>Start Time:</div>
              <div>{new Date(startTime * 1000).toDateString()}</div>
            </div>
            <div className="flex flex-col ">
              <div>End Time:</div>
              <div>November 22nd, 00:00 UTC</div>
            </div>
          </div>
        </CardContainer>
        <CardContainer>
          <div className="font-bold">Please Enter The CLUB Amount</div>
          <div className="flex justify-between gap-3 items-center  tablet_sm:flex-col">
            <CoinBoxContainer icon="/images/solana.png" text="SOL" balance={balance} max={true} setIsValue={setIsValue} isValue={isValue} />
            <Image src={"/images/exchanger.png"} width={40} height={40} alt="exchanger" />
            <CoinBoxContainer icon="/images/club.png" text="CLUB" balance={balance} max={false} setIsValue={setIsValue} isValue={isValue} />
          </div>

          <div className="flex flex-col items-center ">
            <div>
              CLUB remaining for your wallet limit:{" "}
              {remainBuyAmount.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              })}{" "}
              (
              {(remainBuyAmount * PRICE_PER_TOKEN).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 4,
              })}{" "}
              SOL)
            </div>
            <div>Minimum Per Transaction is $500, Maximum For Presale is $5,000</div>
          </div>
          <ButtonContainer text={isClaim ? "Claim" : "BUY CLUB"} className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={isClaim ? () => onClaimToken() : () => onBuyToken()} />

        </CardContainer>
      </div >

      {publicKey?.toString() == PRESALE_AUTHORITY.toString() &&
        (
          <CardContainer className=" max-w-full">
            <div className="flex justify-between gap-2">
              <input type="datetime-local" className="bg-transparent" onChange={(e: any) => setStartDate(e.target.value)} />
              <input type="datetime-local" className="bg-transparent" onChange={(e: any) => setEndDate(e.target.value)} />
              {startTime ? <ButtonContainer text="Update Presale" className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onUpdatePresale(startDate, endDate)} /> : <ButtonContainer text="Start Presale" className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onCreatePresale(startDate, endDate)} />}
              {startTime && <ButtonContainer text="Deposit Token" className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onDepositToken()} />}
              {startTime && <ButtonContainer text="Withdraw Token" className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onWithdrawToken()} />}
              {startTime && <ButtonContainer text="Withdraw Sol" className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onWithdrawSol()} />}
            </div>
          </CardContainer>
        )}
      <div className="text-lg font-900 max-w-2xl">With A Presale Price Of 0.07 BUSD. Our Minimum Limit Will Be $500 BUSD And
        A Max Of $5,000 BUSD. See Our Whitepaper For Further Details.</div>
      <div className="flex gap-20 w-full desktop_sm:flex-col">
        <div className="flex flex-col text-xl font-900 w-full items-center gap-2">
          <ProgressContainer value={Math.floor(
            ((totalBuyAmount / 10 ** TOKEN_DECIMAL) * 100) /
            TOKEN_PRESALE_HARDCAP
          )} />
          Presale Amount received
        </div>
        <div className="flex flex-col text-xl font-900 w-full items-center gap-2">
          <ProgressContainer value={Math.floor(
            ((buyAmount / 10 ** TOKEN_DECIMAL) * 100) / BUYER_TOKEN_HARDCAP
          )} />
          Your Hard Cap Amount
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="flex flex-col ">
          <div className="text-md">Presale Amount Received:</div>
          <div>{TOKEN_PRESALE_HARDCAP.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
            CLUB</div>
        </div>
        <div className="flex flex-col ">
          <div className="text-md">Maximum Presale Amount Allocated:</div>
          <div>  {TOKEN_PRESALE_HARDCAP.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
            CLUB</div>
        </div>
        <div className="flex flex-col ">
          <div className="text-md">SHIPE Price:</div>
          <div>    {PRICE_PER_TOKEN.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 9,
          })}{" "}
            SOL</div>
        </div>
      </div>
    </main >
  );
}
