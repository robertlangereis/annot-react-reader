import React, { useState, useEffect } from 'react'
// import PopOver from './PopOver'

export default function VocaElement ({ voca, dictionaryLookup }) {
  const [hoverWord, setHoverWord] = useState();
  const [hoverWordListAvailable, setHoverWordListAvailable] = useState(false);
  
  useEffect(() => {
    (async function anyNameFunction() {
      const foundWord = dictionaryLookup(voca);
      setHoverWord(await foundWord)
      // console.log('hoverWord', hoverWord);
      // console.log('hoverWordListAvailable', hoverWordListAvailable);
    })()
  }, []);
  
  const setHoverVocaWord = async() => {
    setHoverWordListAvailable(await hoverWord)
  //   setHoverWord(await foundWord);
  //   // console.log('foundWord', foundWord);
  //   // setHoverWord(true)
  };
  
  // console.log('hoverWordListAvailable', hoverWordListAvailable);
  // console.log('setHoverWord', setHoverWord);
  console.log('hoverWord', hoverWord);
  return (
    voca &&
        <div>
          <li className='annotations__new-words' onClick={() => setHoverVocaWord()}>{voca}</li>
          {hoverWordListAvailable && <span className="popovertext" style={{visibility: hoverWord && 'visible' }} >{hoverWord.length !== 0 ? hoverWord[0] : "N/A"}</span>}
          {/* <span className="popovertext" style={{visibility: hoverWordActive && 'visible' }} key={i + 'b'} >{'hi'}</span> */}
        </div>
      );
}
