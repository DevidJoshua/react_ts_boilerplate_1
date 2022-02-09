interface WalletResponse {
  id?: number;
  fullName?: string;
  mobileNum?: string;
  walletType?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  user_profile?: number;
}

export interface ProfileResponse {
  id?: number;
  fullName?: string;
  rewardPoint?: null;
  mobileNum?: string;
  lastName?: string;
  subsLevel?: null;
  created_at?: string;
  updated_at?: string;
  user?: null;
  mobileVerified?: null;
  address?: null;
  profileType?: string;
  produk?: null;
  profilePic?: null;
  user_wallets: WalletResponse[];
  produks: [];
  user_wish_lists: [];
}
