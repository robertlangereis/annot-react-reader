import React, { useState, useEffect } from 'react'
// import PopOver from './PopOver'

export default function VocaElement ({ voca, dictionaryLookup, setVocaWordsToKeep, vocaWordsToKeep }) {
  const [hoverWord, setHoverWord] = useState();
  const [hoverWordListAvailable, setHoverWordListAvailable] = useState(false);
  const [showHoverWord, setShowHoverWord] = useState(false);
  
  
  useEffect(() => {
    (async function anyNameFunction() {
      const foundWord = dictionaryLookup(voca);
      setHoverWord(await foundWord)
    })()
    showHoverWord && setHoverVocaWord() 
  }, [showHoverWord]);
  
  const setHoverVocaWord = async() => {
    setHoverWordListAvailable(await hoverWord)
  };

  var styling = {
    annotationFoundStyle:{
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1.2rem'
      },
    annotationNotFoundStyle:{
      cursor: 'default',
      fontWeight: 'normal',
      color: 'lightgrey',
      fontSize: '0.9rem'
      }
  };

  return (
    voca &&
        <div>
          {hoverWord && 
          <li className='annotations__new-words' 
          onMouseEnter={() => setShowHoverWord(true)}
          onMouseLeave={() => setShowHoverWord(false)}
          onClick={() => setVocaWordsToKeep([...vocaWordsToKeep, `${voca} => ${hoverWord.length !== 0 && hoverWord[0]}`])}
          style={hoverWord.length !== 0 ? 
            styling.annotationFoundStyle : styling.annotationNotFoundStyle}
            >{voca}</li>}
          {(showHoverWord && hoverWordListAvailable) && <span className="popovertext" style={{visibility: hoverWord && 'visible' }} >{hoverWord.length !== 0 && hoverWord[0]}</span>}
        </div>
      );
}
