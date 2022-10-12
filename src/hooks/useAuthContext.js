import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext' //내가 만든 hook

//AuthContext를 전역에서 이용하기 위해만든 hook
export const useAuthContext = ()=>{
  const context = useContext(AuthContext)

  return context //이제 context 안에는 반환하는 state와 & dispatch함수가 들어가 있음. value={...state, dispatch} 기억하자.
}