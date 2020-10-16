import React, { useEffect, useState } from 'react'
import AnnotationElement from './AnnotationElement'
import VocaElement from './VocaElement'

export default function Annotations ({ title, author, texts, dictionaryLookup }) {


const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const [annotObject, setAnnotObject] = useState();


const removePunctuation = (string)=> {
  return string
    .split('')
    .filter(function(letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join('');
}

useEffect(() => {
      const vocaArray = []
      const longerTextsArray = []
      
      texts.forEach(item => {
        const wordCount = str => str.split(' ').length
        const wordLength = wordCount(item)
        if (wordLength < 2) vocaArray.push(removePunctuation(item))
        else longerTextsArray.push(item)
      })
      
      const annotObject = {
        voca: vocaArray,
        annotations: longerTextsArray
      }
      setAnnotObject(annotObject)

    // Update the document title using the browser API
    document.title = `Annot.io | ${title} by ${author}`
    
  }, [])

  return (
    texts && (
      <article className='annotations__section'>
        <div className='annotations__titles'>
          <h1 className='annotations__title'>{title}</h1>
          <h3 className='annotations__author'>{author}</h3>
        </div>
        {/* <div>{annotationTexts}</div> */}
        <div className='container'>
          <div className='row'>
            <section className='col-sm'>
              <h2 className="annotations__text">Text Annotations</h2>
              {annotObject && annotObject.annotations.map((annotation, i) => <AnnotationElement key={i} annotation={annotation} />)}
            </section>
            <section className='col-sm'>
              <h2 className="annotations__text">New words</h2>
              {annotObject && annotObject.voca.map((voca, i) => <VocaElement key={i} voca={voca} dictionaryLookup={dictionaryLookup} />)}
            </section>
          </div>
        </div>
      </article>
    )
  )
}
