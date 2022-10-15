import { collection, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import { appFireStore } from "../firebase/config"

export const useCollection = ( transaction ) => {

  const [ documents, setDocuments ] = useState(null); //화면에 보여줄 documents인데 state바뀔때마다 화면에도 보이는 게 달라지겠지 
  const [ error, setError ] = useState(null);

  //컬렉션이 변할 때만 실행해야 해서 useEffect안에 작성
  useEffect(()=>{
    //컬렉션 서버에 전달할 1번째 괄호안은 약속의 appFireStore와 내가지은 컬렉션이름
		//2번째 괄호안 인자는 서버컬렉션으로부터 기억장치(snapshot)를 받아온 거임 즉 폴더가 열려진 상태. 그 안에 문서가 들어있고 콜백함수로 다음실행을 할 수 있다.
    const unsubscribe = onSnapshot(collection( appFireStore, transaction ), ( snapshot )=>{ 

      let result = [ ];
      snapshot.docs.forEach(( doc ) =>{
        result.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(result);
      setError(null);
    },
    (error) => { setError(error.message) } //snapshot은 자체적으로 try,catch가 가능해서 이렇게 쓸 수 있다.
    )
    return unsubscribe;
  }, [ collection ]) //컬렉션에 변화가 생길 떄만 실행



  return { documents, error }
}