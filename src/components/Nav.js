import styles from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav(){

  const { logout } = useLogout();
  const { user } = useAuthContext(); //state가져왔는데, user라고 명명하자

  return(
    <nav>
      <h1>Daily Note</h1>
      <ul className={styles.list_nav}>
        { !user && //로그인을 안 한 상태일 때 == 가져온 user값이 없을 떄   
          <>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup"> Sign In</Link></li>
          </>
        }
        { user && //로그인 한 상태일 때 == 가져온 user값이 존재할 떄
          <>
          <li><button type="button" onClick={logout}>Log Out</button></li>
          </>
        }
      </ul>
    </nav>
  )
}