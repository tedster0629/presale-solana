import { PublicKey } from "@solana/web3.js";

export const PRESALE_PROGRAM_PUBKEY = new PublicKey(
    "C1uXqafarPh2Q8TmKSi9r9pUp3LQikA4QWA1nrC6k1eN"
);

export const TOKEN_PUBKEY = new PublicKey(
    "Aq36ngTDYx6YyM8UnuTnDSTkNXjqZ4mo6eXTgVzpCpP2"
);

export const PRESALE_SEED = "CLUB_PRESALE_SEED";
export const USER_SEED = "CLUB_USER_SEED";
export const PRESALE_ID = 0;

export const PRESALE_AUTHORITY = new PublicKey(
    "4Esh8qwwN6gpBJS9hYzMh4XNiXaTfBZ1fw1u8U4o2ibt"
);

export const TOKEN_PRESALE_HARDCAP = 4000000000; // token
export const PRICE_PER_TOKEN = 0.02; // sol    

export const BUYER_SOFTCAP = 0.2; // sol
export const BUYER_HARDCAP = 50; // sol
export const BUYER_TOKEN_HARDCAP = 250; // token

export const TOKEN_DECIMAL = 9;
