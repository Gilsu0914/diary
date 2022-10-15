import { useReducer } from 'react'
import { addDoc, deleteDoc, collection, doc } from 'firebase/firestore'
import { appFireStore, timestamp } from '../firebase/config'

//객체형 데이터
const initState = {
  document: null,
  isPending : false,
  error: null,
  success : false,
}

const storeReducer = ( state, action ) =>{
  switch( action.type ){
    case `isPending` :
      return { isPending: true, document: null, success: false, error: null }
    case `addDoc` :
      return { isPending: false, document: action.payload, success: true, error: null }
    case `deleteDoc` :
      return { isPending: false, document: action.payload, success: true, error: null }
      case `error` :
      return { isPending: false, document: action.payload, success: true, error: null }
    default: 
      return state
  }
}

//firebase는 테이블이나 행을 갖다 쓰는 기존 데이터저장박식과는 다르게 document를 저장하는 collection 구조로 형성되어있다.
//때문에 저장할 컬렉션을 인자로 전달받아서 거기에 작업을 한다. transaction으로 명명해주자.
export const useFirestore = ( transaction ) => {
  
  const [ response, dispatch ] = useReducer(storeReducer, initState);

  // colRef : 우리가 만들 컬랙션의 참조. 인자로 받아온 컬렉션의 이름이 들어가 있다.
  const colRef = collection( appFireStore, transaction );

  //컬렉션에 문서 추가
  const addDocument = async ( doc ) => { //doc : diary컴포넌트에서 입력한 값
    dispatch({ type: `isPending` });

    try{
      const createdTime = timestamp.fromDate( new Date() );
      const docRef = await addDoc(colRef, { ...doc, createdTime })
      console.log(docRef);
      dispatch({ type: `addDoc`, payload: docRef });
    }
    catch (error) {
      dispatch({ type: `error`, payload: error.message })
    }
  }

  //컬렉션에서 문서 제거
  const deleteDocument = async ( id ) => {
    dispatch({ type: `isPending` });

    try{
      const docRef = await deleteDoc( doc(colRef, id) )
      dispatch({ type: `deleteDoc`, payload: docRef });
    }
    catch (error) {
      dispatch({ type: `error`, payload: error.message })
    }
  }
  return { addDocument, deleteDocument, response }
}