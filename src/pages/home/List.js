import styles from './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore'
import { IoTrashBinSharp } from 'react-icons/io5';

export default function List({ documents }){
  
  const { deleteDocument } = useFirestore('diary');
  
  return(
    <>
      {
        documents.map((i)=>{
          return(
            <li key={i.id}>
              <h2 className={styles.titles}>{ i.title }</h2>
              <p className={styles.texts} >{ i.text }</p>
              <h5>{i.date}</h5>
              <button onClick={()=>{ deleteDocument(i.id) }} ><IoTrashBinSharp></IoTrashBinSharp></button>
            </li>
          )
        })
      }
    </>
  )
}