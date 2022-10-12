import {createContext, useReducer} from 'react'

const AuthContext = createContext();

const authReducer = (state, action)=>{
  switch(action.type){
    default:
      return state
  }
}

const AuthContextProvider = ({children})=>{
  
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  return( //그냥 다 덮자~~
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}