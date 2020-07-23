import React from 'react'

export default function VocaElement({allAnnotations}) {
    console.log('voca', allAnnotations.voca);
    return (
        allAnnotations.voca.map((item, i)=> <li key={i}>{item}</li>)
    )
}