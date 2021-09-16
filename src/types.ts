import * as anchor from '@project-serum/anchor';

export interface IPaymentPda {
  priceLamports: anchor.BN;
  count: number;
  maxCount: number;
  beneficiary: anchor.web3.PublicKey;
  authority: anchor.web3.PublicKey;
}
