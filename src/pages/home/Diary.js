
import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function Diary({ uid }){
  
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const { addDocument, response } = useFirestore('diary'); //diary라고 한 이유: 우리가 만들 컬렉션 명명한 거고 이게 인자로 전달

  const handleData = (e)=>{
    if(e.target.id == "title"){ setTitle(e.target.value) }
    else if(e.target.id == "text"){ setText(e.target.value) }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(title, text) //배포 전 지우기
    addDocument({ uid, title, text });
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
          <legend>How was your today?</legend>
          <label htmlFor="title">TITLE</label>
          <input type="text" value={title} required id="title" onChange={handleData}/>

          <label htmlFor="text">KEEP A DIARY</label>
          <textarea type="text" value={text} required id="text" onChange={handleData}></textarea>

          <button type="submit">Save</button>
        </fieldset>
      </form>
    </>
  )
}