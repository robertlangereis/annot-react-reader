import React from 'react'
import PopOver from './PopOver'

export default function VocaElement ({ allAnnotations, dictionaryLookup }) {
  console.log('voca', allAnnotations.voca)
  return (
    allAnnotations.voca &&
    allAnnotations.voca.map((item, i) => (
      <PopOver className='annotations__new-words' vocaWord={item} key={i} dictionaryLookup={dictionaryLookup}/>
    ))
  )
}
