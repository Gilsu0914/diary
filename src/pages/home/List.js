import { useFirestore } from '../../hooks/useFirestore'
import styles from './List.module.css'
import { FiTrash } from 'react-icons/fi';

export default function List({ documents }){
  
  const { deleteDocument } = useFirestore('diary');
  
  return(
    <>
      {
        documents.map((i)=>{
          return(
            <li key={i.id}>
              <h2 className={styles.title}>{ i.title }</h2>
              <p className={styles.text}>{ i.text }</p>
              <button onClick={()=>{ deleteDocument(i.id) }} ><FiTrash></FiTrash></button>
            </li>
          )
        })
      }
    </>
  )
}