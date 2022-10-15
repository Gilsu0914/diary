import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react'
import { appAuth } from '../firebase/config';

const AuthContext = createContext();//context 객체를 생성

const authReducer = (state, action)=>{
  switch(action.type){
    case `login`: //로그인과 회원가입은 같은 케이스임. firebase는 회원가입을 하면 그 유저를 로그인 돼있다고 판단하니까.
      return { ...state, user: action.payload } //병합시키면서 겹치는 부분 새 payload를 통해 가져온 거로 덮어씌우기 위해
    case `logout`:
      return { ...state, user: null }
    case `isAuthReady`:
      return { ...state, user: action.payload, isAuthReady:true } //isAuthReady가 true가 되면 렌더링 유발 -> 로그인 전(false)이랑 로그인 후(true) 화면노출 다르게 하려고
    default:
      return state
  }
}


 //인자값은 children이라 명명 사실상 컴포넌트 싹 다
const AuthContextProvider = ({children})=>{


  //사용자 인증정보 처리중일 땐 리액트 렌더링 차단, 인증정보 받아오고나면 그 때 렌더링을 구현
  useEffect(()=>{ 
    const unsubscribe = onAuthStateChanged(appAuth, (user)=>{ //user정보를 반환해줌. 바뀐 user 정보를 갖다가 콜백함수 실행. 아참! 리액트야 너이제 렌더링해도 돼 허락해줄게~
      dispatch({ type: `isAuthReady`, payload: user }) //유저정보 가져왔고 렌더링도 될테니 화면다르게 보일 준비자세 취하기 :  onAuthStateChanged로 반환받은 user를 payload로 탑재 & isAuthReady도 true로 변경
    })
    return unsubscribe;
  },[])
  
  const [state, dispatch] = useReducer(authReducer, { 
    user: null, 
    isAuthReady: false, //사용자 인증정보가 준비가 되었는지 안 되었는지 판단할 수 있게 하는 것인데 useEffect로 인해 인증판단 뒤엔 무조건 true로 바뀔 예정.
   })

  console.log(`user state는 : `, state)

  return( //그냥 다 덮자~~
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children} {/* context 품안에 들어가게 될 컴포넌트 */}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthContextProvider }


