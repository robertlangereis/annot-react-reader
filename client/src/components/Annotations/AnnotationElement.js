import React from 'react'

export default function AnnotationElement({ annotation }) {
    return (
        annotation && <li className='annotations__item'>{annotation}</li>
    )
}