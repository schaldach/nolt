import React from "react"
import AnotationTitle from "./AnotationTitle"
import AnotationTitleInput from "./AnotationTitleInput"
import AnotationContent from "./AnotationContent"
import AnotationContInput from "./AnotationContInput"

function Anotation({edit}) {
    return (
        <div className='anot'>
            <div>
                <AnotationTitle title='Título'></AnotationTitle>
            </div>
            <div>
                <AnotationContent text='Texto'></AnotationContent>
                <AnotationContent text='Texto'></AnotationContent>
            </div>
        </div>
    )
}

export default Anotation;