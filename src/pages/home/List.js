import { useFirestore } from '../../hooks/useFirestore'
import styles from './List.module.css'

export default function List({ documents }){
  
  const { deleteDocument } = useFirestore('diary');
  
  return(
    <>
      {
        documents.map((i)=>{
          return(
            <li key={i.id}>
              <strong className={styles.title}>{ i.title }</strong>
              <p className={styles.text}>{ i.text }</p>
              <button onClick={()=>{ deleteDocument(i.id) }} >delete</button>
            </li>
          )
        })
      }
    </>
  )
}