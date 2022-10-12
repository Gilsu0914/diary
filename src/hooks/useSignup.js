import { useState } from 'react'
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';


export const useSignup = () =>{
  const [error, setError] = useState(null); //에러 정보 저장을 위해
  const [isPending, setIsPending] = useState(false); //현재 서버와 통신상태저장을 위해. true면 통신을 하고 있는 상태
  
  
  const { dispatch } = useAuthContext(); 


  const signup = (email, password, displayName) =>{ //인자로 email,pw, displayName 가져오기
    setError(null); //아직 에러가 없음.
    setIsPending(true); //통신 진행중.

    createUserWithEmailAndPassword(appAuth, email, password) //받아온 이메일과 비번으로 회원가입 진행하는 firebase기본함수
    .then((userCredential) => { //Promise 성공시 작동
      const user = userCredential.user; //사용자의 정보 user변수에 다 넣기

      console.log(user)
      if(!user){
        throw new Error(`회원가입에 실패했습니다.`)
      }

      updateProfile(appAuth.currentUser, {displayName}) //displayName 업데이트
        .then(()=>{
          dispatch({ type: 'login', payload: user })
          setError(null);
          setIsPending(false);
        })
        .catch((err)=>{
          setError(err.message);
          setIsPending(false);
        })


    })
    .catch((err)=>{
       setError(err.message);
       setIsPending(false);
    })
  }
  return {error, isPending, signup}
}