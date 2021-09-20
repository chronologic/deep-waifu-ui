import * as anchor from '@project-serum/anchor';

export interface IPaymentPda {
  priceLamports: anchor.BN;
  count: number;
  maxCount: number;
  beneficiary: anchor.web3.PublicKey;
  authority: anchor.web3.PublicKey;
}

export interface IMintStatus {
  status: string;
  message: string;
  id?: number;
  tx?: string;
}
