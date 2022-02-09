import React, { FC, useEffect, useCallback, useState, useContext } from 'react';
import fetcher from '@/helpers/fetcher';
import { useCookies } from 'react-cookie';
import { API_HOST } from '@config';

const API = `${API_HOST}users/me`;
const API_PROFILE = `${API_HOST}profiles/`;

export interface ChallengeItems {
  actualValue: number;
  challenge: number;
  id: number;
  isAchieve: boolean;
  isDisbursed: boolean;
  landingEndPoint: string;
  maxValue: number;
  refChallengeNo: string;
  expiredTime: string | null;
}
interface AuthResponse {
  id: number;
  username: string;
  email: string;
  user_profile: number;
  statusCode?: number;
  message?: string;
}

interface AuthProps {
  isAuth: boolean;
  loading: boolean;
  userData: {
    userID: number;
    username: string;
    email: string;
    mobileVerified: boolean;
    challengeDetails: ChallengeItems[];
    rewardPoint: number;
    phoneNumber: string;
  };
  profileID: number;
  token: string;
}

const AuthContext = React.createContext<AuthProps>({} as AuthProps);

const AuthProvider: FC = ({ children }) => {
  const [cookies, , removeCookie] = useCookies();
  const [loading, setLoading] = useState<boolean>(true);
  const [valToken, setValToken] = useState<string>('');
  const [valAuth, setValAuth] = useState<boolean>(false);
  const [valUserID, setValUserID] = useState<number>(0);
  const [valUsername, setValUsername] = useState<string>('');
  const [valUserEmail, setValUserEmail] = useState<string>('');
  const [valProfileID, setValProfileID] = useState<number>(0);
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const [valChallengeDetails, setValChallengeDetails] = useState<ChallengeItems[]>([]);
  const [valRewardPoint, setValRewardPoint] = useState<number>(0);
  const [valMobileNum, setValMobileNum] = useState<string>('');

  const jwtToken = cookies._SID_react;
  const isExistSIDreact = Boolean(jwtToken) || false;

  const getIsAuthenticated = useCallback(async () => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
        token: jwtToken,
      }).then(async (response: AuthResponse) => {
        if (response.statusCode === 401 || response.message === 'Invalid token.') {
          removeCookie('_SID_react', {
            path: '/',
          });
          window.location.replace('/login');
        } else {
          const userID = response.id;
          const profileID = response.user_profile;
          const isAuthenticated = userID > 0;

          await fetcher(`${API_PROFILE}${profileID}`, {
            method: 'GET',
            token: jwtToken,
          }).then(
            (resp: {
              mobileVerified: boolean;
              challenge_details: ChallengeItems[];
              rewardPoint: number;
              mobileNum: string;
            }) => {
              setValAuth(isAuthenticated);
              setValUserID(userID);
              setValProfileID(profileID);
              setValToken(jwtToken);
              setValUsername(response.username);
              setValUserEmail(response.email);
              setIsMobileVerified(resp.mobileVerified);
              setValChallengeDetails(resp.challenge_details);
              setValRewardPoint(resp.rewardPoint);
              setValMobileNum(resp.mobileNum);
              setLoading(false);
            },
          );
        }
      });
    } catch (error) {
      console.warn(error);
    }
  }, [jwtToken, removeCookie]);

  useEffect(() => {
    if (isExistSIDreact) {
      getIsAuthenticated();
    } else {
      setLoading(false);
    }
  }, [getIsAuthenticated, isExistSIDreact]);

  const state = {
    isAuth: valAuth,
    loading,
    userData: {
      userID: valUserID,
      username: valUsername,
      email: valUserEmail,
      mobileVerified: isMobileVerified,
      challengeDetails: valChallengeDetails,
      rewardPoint: valRewardPoint,
      phoneNumber: valMobileNum,
    },
    profileID: valProfileID,
    token: valToken,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
