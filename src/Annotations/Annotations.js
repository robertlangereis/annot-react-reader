import React from 'react'

export default function Annotations({title, author, voca, texts}) {
 
    return (
        <div>
            <h1>{title}</h1>
            <h1>{author}</h1>
            {/* <div>{annotationTexts}</div> */}
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                    {voca && voca}
                    </div>
                    <div className="col-md">
                    {texts && texts}
                    </div>
                </div>
            </div>
        </div>
    )
}
