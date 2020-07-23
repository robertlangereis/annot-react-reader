import React from 'react'

export default function AnnotationElement({allAnnotations}) {
    return (
        allAnnotations.annotations.map((item, i)=> <li class='annotations__item' key={i}>{item}</li>)
    )
}