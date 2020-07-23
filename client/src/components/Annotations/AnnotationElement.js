import React from 'react'

export default function AnnotationElement({allAnnotations}) {
    return (
        allAnnotations.annotations.map((item, i)=> <li key={i}>{item}</li>)
    )
}