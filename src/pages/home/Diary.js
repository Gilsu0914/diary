
import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { FaSmile } from "react-icons/fa";

export default function Diary({ uid, displayName }){
  
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const date = new Date().toLocaleDateString()

  const { addDocument, response } = useFirestore('diary'); //diary라고 한 이유: 우리가 만들 컬렉션 명명한 거고 이게 인자로 전달

  const handleData = (e)=>{
    if(e.target.id == "title"){ setTitle(e.target.value) }
    else if(e.target.id == "text"){ setText(e.target.value) }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    addDocument({ uid, title, text, date });
  }

  useEffect (()=>{
    if(response.success){
      setTitle(``);
      setText(``);
    }
  },[ response.success ])


  return(
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>{displayName}님! 오늘 하루는 어땠나요?<span><FaSmile></FaSmile></span></legend>

          <label htmlFor="title">TITLE</label>
          <input type="text" value={title} required maxLength={30} placeholder="최대30글자" id="title"  onChange={handleData}/>

          <label htmlFor="text">JOURNAL</label>
          <textarea type="text" value={text} required id="text" wrap="hard" onChange={handleData}></textarea>
          <i>{date}</i>
          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  )
}