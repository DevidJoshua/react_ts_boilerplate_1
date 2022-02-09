import React, { FC, useState, useContext, useCallback, useEffect } from 'react';
import { useAuth } from '../Auth';
import { UserDataContextValues, userInfoInterface } from './interface';

const defeaultUserInfo = {
  userInfo: {
    token: '',
    userID: 0,
    profileID: 0,
    moreUserInfo: {
      fullName: '',
      phoneNumber: '',
      email: '',
      username: '',
      mobileVerified: false,
      challengeDetails: [],
      rewardPoint: 0,
    },
  },
};

const UserDataContext = React.createContext<UserDataContextValues>({} as UserDataContextValues);

const UserDataProvider: FC = ({ children }) => {
  const [data, setData] = useState<userInfoInterface>(defeaultUserInfo.userInfo);

  const { isAuth, token, userData, profileID, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuth) {
      setData({
        token,
        userID: userData.userID,
        profileID,
        moreUserInfo: {
          username: userData.username,
          email: userData.email,
          mobileVerified: userData.mobileVerified,
          challengeDetails: userData.challengeDetails,
          phoneNumber: userData.phoneNumber,
          rewardPoint: userData.rewardPoint,
        },
      });
    }
  }, [
    isAuth,
    loading,
    profileID,
    token,
    userData.challengeDetails,
    userData.email,
    userData.mobileVerified,
    userData.phoneNumber,
    userData.rewardPoint,
    userData.userID,
    userData.username,
  ]);

  const handleSetData = useCallback(val => {
    setData(val);
  }, []);

  const state = {
    isLoggedIn: isAuth,
    userInfo: data,
    loading: loading,
    setUserData: handleSetData,
  };

  return <UserDataContext.Provider value={state}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => useContext(UserDataContext);
export default UserDataProvider;
