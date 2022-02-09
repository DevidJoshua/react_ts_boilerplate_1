export interface ChallengeDetailResponse {
  id: number;
  user_profile: {
    fullName: string;
  };
  refChallengeNo: string;
  isAchieve: boolean;
  isDisbursed: boolean;
  expiredTime: string;
}

export const ChallengeDetailDefault = {
  id: 0,
  user_profile: {
    fullName: '',
  },
  refChallengeNo: '',
  isAchieve: false,
  isDisbursed: false,
  expiredTime: '',
};
