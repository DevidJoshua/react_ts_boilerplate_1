export interface ChallengeStatusResponse {
  userChallengeDetails: {
    id: number;
    refChallengeNo: string;
    maxValue: number;
    actualValue: number;
    isAchieve: boolean;
    isDisbursed: boolean;
    expiredTime: string | null;
  };
  members: [{
    name: string;
  }];
}
