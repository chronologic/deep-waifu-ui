import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const API_URL = process.env.REACT_APP_API_URL as string;

export const SOLANA_ENV = process.env.REACT_APP_SOLANA_ENV as WalletAdapterNetwork;

export const PAYMENT_PROGRAM_ID = process.env.REACT_APP_PAYMENT_PROGRAM_ID as string;
export const PAYMENT_PROGRAM_PDA = process.env.REACT_APP_PAYMENT_PROGRAM_PDA as string;
