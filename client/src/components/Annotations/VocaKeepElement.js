import React, { useState } from 'react'
// import PopOver from './PopOver'

export default function VocaKeepElement ({ vocaKeepWord,setVocaWordsToKeep }) {
  
  let capitalizeWord = vocaKeepWord
  return (
    vocaKeepWord.length &&
        <div>
          <li className='annotations__new-words' 
          onClick={()=> setVocaWordsToKeep(oldVocaKeepWord => {
            const index = oldVocaKeepWord.indexOf(vocaKeepWord)
            const newVocaKeepWord = [...oldVocaKeepWord]
            newVocaKeepWord.splice(index, 1)
            if (index !== -1) return newVocaKeepWord
          })}
          // >{capitalizeWord.charAt(0).toUpperCase() + capitalizeWord.slice(1)}</li>
          >{vocaKeepWord}</li>
        </div>
      );
}
