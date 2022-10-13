import { useState } from 'react'
import { appAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';


export const useLogin = () =>{
  const [error, setError] = useState(null); //에러뜨면 에러메세지 출력위해
  const [isPending, setIsPending] = useState(false); //현재 서버와 통신상태중 표시를 위해. 일종의 스켈레톤 작업
  
  
  const { dispatch } = useAuthContext(); 


  const login = ( email, password ) =>{ //인자로 email,pw, displayName 가져오기
    setError(null); //아직 에러가 없음.
    setIsPending(true); //통신 진행중.

    signInWithEmailAndPassword(appAuth, email, password) //firebase기본함수: 인풋&submit을 통해 받아온 인자인 이메일과 비번으로 가입진행
    .then((userCredential) => { //Promise 성공시 작동
      const user = userCredential.user; //사용자의 정보 user변수에 다 넣기

      dispatch({type : `login`, payload: user });
      setError(null);
      setIsPending(false);

      if(!user){
        throw new Error(`회원가입에 실패했습니다.`)
      }
    })
    .catch((err)=>{
       setError(err.message);
       setIsPending(false);
    })
  }
  return { error, isPending, login }
}