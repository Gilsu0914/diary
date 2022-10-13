import { useState } from 'react'
import { signOut } from "firebase/auth";
import { appAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';


export const useLogout = ()=>{
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = ()=>{
    setError(null);
    setIsPending(true);

    signOut(appAuth) //firebase기본함수 : 사인아웃
    .then(() => {
      dispatch({ type : `logout` }) //로그아웃 디스패치 적용
      setError(null);
      setIsPending(false);
    })
    .catch((error) => {
      setError(error);
      setIsPending(false);
    });
    

  }
  return{ error, isPending, logout }
}