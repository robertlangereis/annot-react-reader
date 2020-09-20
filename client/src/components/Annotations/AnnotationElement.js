import React from 'react'

export default function AnnotationElement({allAnnotations}) {
    return (
        allAnnotations.annotations && allAnnotations.annotations.map((item, i)=> <li className='annotations__item' key={i}>{item}</li>)
    )
}