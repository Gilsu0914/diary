import styles from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

import { FiLogOut } from "react-icons/fi";


export default function Nav(){

  const { logout } = useLogout();
  const { user } = useAuthContext(); 

  return(
    <nav>
      <div className={styles.innerNav}>
        <h1>Daily Note</h1>
        <ul className={styles.list_nav}>
          { !user && //로그인을 안 한 상태일 때 == 가져온 user값이 없을 떄   
            <>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">가입하기</Link></li>
            </>
          }
          { user && //로그인 한 상태일 때 == 가져온 user값이 존재할 떄
            <>
            <li><button type="button" onClick={logout}><FiLogOut></FiLogOut></button></li>
            </>
         }
        </ul>
      </div>
    </nav>
  )
}