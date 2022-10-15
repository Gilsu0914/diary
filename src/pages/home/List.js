import styles from './List.module.css'

export default function List({ documents }){
  return(
    <>
      {
        documents.map((i)=>{
          return(
            <li key={i.id}>
              <strong className={styles.title}>{ i.title }</strong>
              <p className={styles.text}>{ i.text }</p>
            </li>
          )
        })
      }
    </>
  )
}