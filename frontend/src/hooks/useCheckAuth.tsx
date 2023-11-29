/* eslint-disable react-hooks/exhaustive-deps */
// useAuthcheck.ts
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/appHooks';
import { addUser } from '../redux/features/auth/authSlice';
import { message } from 'antd';

export default function useAuthcheck() {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = localStorage.getItem("arraytics-auth");
  const {email} = useAppSelector(state=>state.auth)
  const isValid = () => {
    if(user){
      const parsedUser = JSON.parse(user);
          const valid = parsedUser?.accessToken && Date.now() < parsedUser.accessToken.expires * 1000;
          console.log({valid,user})
          return valid
    }
    return false;
  }

  useEffect(() => {
    function checkAuth() {
      if(isValid() && user){
        dispatch(addUser(JSON.parse(user)));
        setAuthChecked(true);
        setIsLoading(false)
      }
      else{
        message.error('Session expires, please login again!');
        setAuthChecked(false);
        setIsLoading(false)
      }
  }
    checkAuth();
  }, [dispatch,user,email]);

  return { authChecked, isLoading };
}
