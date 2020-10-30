import React, { useState } from 'react'
// import PopOver from './PopOver'

export default function VocaKeepElement ({ vocaKeepWord,setVocaWordsToKeep }) {
  
  let capitalizeWord = vocaKeepWord
  return (
    vocaKeepWord.length &&
        <div>
          <li className='annotations__new-words' 
          onClick={()=> setVocaWordsToKeep(vocaKeepWord => {
            const index = vocaKeepWord.indexOf(vocaKeepWord)
            return [vocaKeepWord.splice(index, 1)]
          })}
          // >{capitalizeWord.charAt(0).toUpperCase() + capitalizeWord.slice(1)}</li>
          >{vocaKeepWord}</li>
        </div>
      );
}
