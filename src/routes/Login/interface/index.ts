export interface LoginResponse {
  data?: {
    messages?: {
      message?: string;
    }[];
  }[];
  statusCode?: number;

  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: null;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    profile: null;
    cart: null;
    user_profile: {
      id: number;
      fullName: string;
      rewardPoint: number;
      mobileNum: string;
      lastName: string;
      subsLevel: null;
      created_at: string;
      updated_at: string;
      user: null;
      mobileVerified: boolean | null;
      address: null;
      profileType: string;
      produk: null;
      profilePic: null;
    };
  };
}
