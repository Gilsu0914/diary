import styles from './Home.module.css'
import Diary from './Diary'
import List from './List'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

export default function Home(){
  
  const { user } = useAuthContext();
  const { documents, error } = useCollection(`diary`); //컬렉션 인자값 잊지말자~
  

  return(
    <main>
      <aside>
        <Diary uid={user.uid} ></Diary>
      </aside>
      <ul>
        { error && <strong>{ error }</strong> }
        { documents && <List documents = { documents } /> }
      </ul>
    </main>
    
  )
}