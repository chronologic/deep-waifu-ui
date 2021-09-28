import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const API_URL = process.env.REACT_APP_API_URL as string;
export const SHARE_URL = process.env.REACT_APP_SHARE_URL as string;

export const SOLANA_ENV = process.env.REACT_APP_SOLANA_ENV as WalletAdapterNetwork;

export const PAYMENT_PROGRAM_ID = process.env.REACT_APP_PAYMENT_PROGRAM_ID as string;
export const PAYMENT_PROGRAM_PDA = process.env.REACT_APP_PAYMENT_PROGRAM_PDA as string;

export const PAYMENT_TOKEN_MINT = process.env.REACT_APP_PAYMENT_TOKEN_MINT as string;

export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;

export const PILLOW_PRICE_USD = Number(process.env.REACT_APP_PILLOW_PRICE_USD);
