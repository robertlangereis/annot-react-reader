import React, { useEffect } from 'react'
import AnnotationElement from './AnnotationElement'
import VocaElement from './VocaElement'

export default function Annotations ({ title, author, texts }) {
  const textsConvert = texts => {
    const vocaArray = []
    const longerTextsArray = []
    texts.forEach(item => {
      const wordCount = str => str.split(' ').length
      const wordLength = wordCount(item)
      if (wordLength < 2) vocaArray.push(item)
      else longerTextsArray.push(item)
    })
    const annotObject = {
      voca: vocaArray,
      annotations: longerTextsArray
    }
    return annotObject
  }
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Annot.io | ${title} by ${author}`
  })

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
            <div className='col-sm'>
              <h2 className="annotations__text">Text Annotations</h2>
              <AnnotationElement allAnnotations={textsConvert(texts)} />
            </div>
            <div className='col-sm'>
              <h2 className="annotations__new-words">New words</h2>
              <VocaElement allAnnotations={textsConvert(texts)} />
            </div>
          </div>
        </div>
      </article>
    )
  )
}
