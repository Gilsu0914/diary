import { useState } from 'react'
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';


export const useSignup = () =>{
  const [error, setError] = useState(null); //에러뜨면 에러메세지 출력위해
  const [isPending, setIsPending] = useState(false); //현재 서버와 통신상태중 표시를 위해. 일종의 스켈레톤 작업
  
  
  const { dispatch } = useAuthContext(); 


  const signup = (email, password, displayName) =>{ //인자로 email,pw, displayName 가져오기
    setError(null); //아직 에러가 없음.
    setIsPending(true); //통신 진행중.

    createUserWithEmailAndPassword(appAuth, email, password) //firebase기본함수: 인풋&submit을 통해 받아온 인자인 이메일과 비번으로 가입진행
    .then((userCredential) => { //Promise 성공시 작동
      const user = userCredential.user; //사용자의 정보 user변수에 다 넣기

      console.log(user)
      if(!user){
        throw new Error(`회원가입에 실패했습니다.`)
      }

      updateProfile(appAuth.currentUser, {displayName}) //displayName 업데이트 진행 (함수파라미터가 저런 이유는 firebase가 정한 규칙이라서 그럼. 모르겠으면 사이트문서 참고)
        .then(()=>{
          dispatch({ type: 'login', payload: user }) //회원가입 디스패치 적용 payload로 유저정보 탑재
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