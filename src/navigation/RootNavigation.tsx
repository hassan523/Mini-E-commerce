import React, { useEffect } from 'react';
import AuthNavigation from './AuthNaivgation';
import BtabNavigation from './BtabNavigation';
import { NotifierWrapper } from 'react-native-notifier';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const RootNavigation = () => {
  const selector = useSelector((state: RootState) => state?.userData);
  const isLoggin: boolean = selector?.isLoggin;

  return (
    <>
      {isLoggin ? (
        <NotifierWrapper>
          <BtabNavigation initRoute={'Home'} />
        </NotifierWrapper>
      ) : (
        <NotifierWrapper>
          <AuthNavigation initRoute={'Login'} />
        </NotifierWrapper>
      )}
    </>
  );
};

export default RootNavigation;
