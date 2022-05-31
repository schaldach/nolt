import React from "react"
import AnotationTitle from "./AnotationTitle"
import AnotationContent from "./AnotationContent"

function Anotation() {
    return (
        <div className='anot'>
            <AnotationTitle title='Título'></AnotationTitle>
            <AnotationContent text='Texto'></AnotationContent>
        </div>
    )
}

export default Anotation;