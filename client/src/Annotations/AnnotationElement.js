import React from 'react'

export default function AnnotationElement({allAnnotations}) {
    console.log('allAnnotations', allAnnotations.annotations);
    return (
        allAnnotations.annotations.map((item, i)=> <li key={i}>{item}</li>)
    )
}