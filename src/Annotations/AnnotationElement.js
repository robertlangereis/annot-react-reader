import React from 'react'

export default function AnnotationElement({texts}) {
    return (
        texts.map((item, i)=> <li key={i}>{item}</li>)
    )
}