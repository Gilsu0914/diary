import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.css'

export default function Signup(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');//displayName은 firebase에서 유저 정보에 저장할 수 있는 속성중 하나이니 이름 바꾸지 말 것.

  const { error, isPending, signup } = useSignup(); //hooks폴더안에 커스텀한 useSignup 만든 거 가져오기

  const handleData = (e)=>{
    if(e.target.type === "email"){ setEmail(e.target.value) }
    else if(e.target.type === "password"){ setPassword(e.target.value) }
    else if(e.target.type === "text"){ setDisplayName(e.target.value) }
  }

  const handleSubmit = (e)=>{ //이메일,비번,닉네임 처리 함수
    e.preventDefault();
    signup(email, password, displayName); //내 useSignup hook에 보내주기
  } 

  return(
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>

        <legend><img src={process.env.PUBLIC_URL + '/logo.png'}/></legend>

        <label htmlFor="myEmail">Email </label> {/*레이블과 인풋 연결*/}
        <input type="email" id="myEmail" required value={email} onChange={handleData}/>

        <label htmlFor="myPassWord">Password </label> {/*레이블과 인풋 연결2*/}
        <input type="password" id="myPassWord" required value={password} onChange={handleData}/>

        <label htmlFor="myNickName">Nickname </label> {/*레이블과 인풋 연결3*/}
        <input type="text" id="myNickName" required value={displayName} onChange={handleData}/>

        { !isPending && <button type='submit' className={styles.btn}>회원가입</button> }
        { isPending && <button className={styles.isPendingBtn}>진행중</button> }
        { error && <i>{error}</i> }
      
      </fieldset>
    </form>
  )
}