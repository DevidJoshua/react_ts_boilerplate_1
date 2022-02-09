import React from 'react';
import { ChallengeItems } from '@/context/Auth';

export interface userInfoInterface {
  token: string;
  userID: number;
  profileID: number;
  moreUserInfo: {
    fullName?: string;
    phoneNumber: string;
    email: string;
    username: string;
    mobileVerified: boolean | null;
    challengeDetails: ChallengeItems[];
    rewardPoint: number;
  };
}

export interface UserDataContextValues {
  isLoggedIn: boolean;
  loading: boolean;
  userInfo: userInfoInterface;
  setUserData: React.Dispatch<React.SetStateAction<userInfoInterface>>;
}
