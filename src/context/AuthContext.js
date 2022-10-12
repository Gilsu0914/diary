import { createContext, useReducer } from 'react'

const AuthContext = createContext();//context 객체를 생성

const authReducer = (state, action)=>{
  switch(action.type){
    case `login`: //로그인과 회원가입은 같은 케이스임. firebase는 회원가입을 하면 그 유저를 로그인 돼있다고 판단하니까.
      return { ...state, user: action.payload } //병합시키면서 겹치는 부분 새 payload를 통해 가져온 거로 덮어씌우기 위해
    default:
      return state
  }
}

const AuthContextProvider = ({children})=>{ //인자값은 children이라 명명
  
  const [state, dispatch] = useReducer(authReducer, { user: null })

  console.log(`user state: `, state)

  return( //그냥 다 덮자~~
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children} {/* context 품안에 들어가게 될 컴포넌트 */}
    </AuthContext.Provider>
  )
}
export { AuthContext, AuthContextProvider }


