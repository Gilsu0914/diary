import styles from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Nav(){

  const { logout } = useLogout();
  const { user } = useAuthContext();

  return(
    <nav>
      <h1 className={styles.tit}>Daily Note</h1>
      <ul className={styles.list_nav}>
        { !user && 
          <>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup"> Sign In</Link></li>
          </>
        }
        { user &&
          <>
          <li>Welcome! {user.displayName}</li>
          <li><button type="button" onClick={logout}>Log Out</button></li>
          </>
        }
      </ul>
    </nav>
  )
}