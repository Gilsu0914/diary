import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css'

export default function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isPending, login } = useLogin();

  const handleData = (e)=>{
    if(e.target.type === "email"){ setEmail(e.target.value) }
    else if(e.target.type === "password"){ setPassword(e.target.value) }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    login(email, password);
  } 

  return(
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>

        <legend><img src={process.env.PUBLIC_URL + '/logo.png'}/></legend>

        <label htmlFor="myEmail">이메일 </label> {/*레이블과 인풋 연결*/}
        <input type="email" id="myEmail" required value={email} onChange={handleData}/>

        <label htmlFor="myPassWord">비밀번호 </label> {/*레이블과 인풋 연결2*/}
        <input type="password" id="myPassWord" required value={password} onChange={handleData}/>

        { !isPending && <button type='submit' className={styles.btn}>로그인</button> }
        { isPending && <button className={styles.isPendingBtn}>로그인 진행중입니다.</button> }
        { error && <i>이메일 또는 비밀번호를 잘 못 입력하셨습니다.<br/>{error}</i> }

      
      </fieldset>
    </form>
  )
}