import React, { useState } from 'react'
import AnnotationElement from './AnnotationElement'
import VocaElement from './VocaElement'

export default function Annotations({title, author, texts}) {
    const [voca, setVocas] = useState([])
    const [longerTexts, setLongerTexts] = useState([])

    const textsConvert = texts =>{
    const vocaArray = []
    const longerTextsArray = []
    texts.forEach(item => {
        const wordCount = str => str.split(" ").length
        const wordLength = wordCount(item)
        if(wordLength < 2) vocaArray.push(item)
        else longerTextsArray.push(item)
    })
    console.log('vocaArray', vocaArray);
    console.log('longerTextsArray', longerTextsArray);
    // setVocas(vocaArray) 
    // setLongerTexts(longerTextsArray)
    const annotObject = {
        voca: vocaArray,
        annotations: longerTextsArray
    }
    return annotObject
    }
    return (
        texts && <div>
            <div className="annotations__titles">
            <h1>{title}</h1>
            <h3>{author}</h3>
            </div>
            {/* <div>{annotationTexts}</div> */}
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h2>Text Annotations</h2>
                    <AnnotationElement allAnnotations={textsConvert(texts)}/>
                    </div>
                    <div className="col-sm">
                        <h2>New words</h2>
                    <VocaElement allAnnotations={textsConvert(texts)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
