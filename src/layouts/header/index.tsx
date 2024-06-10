"use client";

import React from "react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi"
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonContainer from "@/components/Button";
import { toast } from "react-toastify";

export default function Header() {
    const { select, wallets, publicKey, disconnect } = useWallet();

    const onWalletConnect = () => {
        if (!publicKey) {
            const installedWallets = wallets.filter(
                (wallet) => wallet.readyState === "Installed"
            );
            if (installedWallets.length <= 0) {
                toast.warning("Phantom wallet is not installed yet.");
                return;
            }
            select(wallets[0].adapter.name);
        } else {
            disconnect();
        }
    };
    return (
        <aside className="w-full max-w-[1500px] z-10 pt-12">
            <div className="flex items-center justify-between">
                <div className="desktop_sm:hidden"></div>
                <div className="flex items-center gap-5 ">
                    <Image
                        src={"/images/logo.png"}
                        alt="KURABU Logo"
                        width={125}
                        height={125}
                        priority
                    />
                    <div className="flex  gap-1 justify-center flex-col">
                        <div className="text-6xl text-danger font-finger_paint tablet_md:text-4xl ">White&Bird</div>
                        <div className="text-h3  !font-jolly_lodger tablet_md:text-h4">THE WBT</div>
                    </div>
                </div>
                <div className="flex gap-4 desktop_sm:hidden">
                    <ButtonContainer text={!publicKey
                        ? "CONNECT WALLET"
                        : publicKey.toBase58().slice(0, 6) +
                        " ... " +
                        publicKey.toBase58().slice(-6)} className="rounded-3xl bg-danger text-md px-10 py-3  m-auto" onClick={() => onWalletConnect()} />

                    <FiMenu className="hidden  tablet_md:flex text-4xl font-900 " ></FiMenu>
                </div>
            </div>
        </aside >
    );
}
