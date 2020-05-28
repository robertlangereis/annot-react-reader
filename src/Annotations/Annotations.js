import React, {useState, useEffect} from 'react'

export default function Annotations({title, author, annotations}) {
    const [voca, setVoca] = useState([])
    const [texts, setTexts] = useState([])
    const [annotationTexts, setAnnotationTexts] = useState(null)
    // const [count, setCount] = useState(0);

    // useEffect(() => {
    //     // console.log('I am JOKER\'s useEffect--->', title.count);
    //     setCount(count + 1);
    //   }, [count]);
    //   console.log('I am JOKER\'s  render-->', count);
    annotations.map(item => {
        return setAnnotationTexts(item)
    })
    annotations && console.log('annotations', annotations);
    // annotations.forEach(item => {
    //     console.log('item', item);
    //     const wordCount= (str)=> { 
    //         return str.split(" ").length;
    //       }
    //     const wordLength = wordCount(item.target.fragment.text)
    // //     // if(wordLength === 1) console.log('one word', item.target.fragment.text);
    // //     // else console.log('many words', item.target.fragment.text);
    //     if(wordLength === 1) return setVoca(prevArray => prevArray, [item.target.fragment.text])
    //     else return setTexts(prevArray => [...prevArray, [item.target.fragment.text]])
    // })
    return (
        <div>
            <h1>{title}</h1>
            <h1>{author}</h1>
            {/* <div>{annotationTexts}</div> */}
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                    {voca && console.log('voca', voca)}
                    </div>
                    <div className="col-md">
                    {texts &&console.log('texts', texts)}
                    </div>
                </div>
            </div>
        </div>
    )
}
