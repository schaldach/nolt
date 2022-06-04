import React from "react"

function SmallerAnotation({linkcontent, linkname, onDelete, id}) {
    return (
        <div className='linkdisplay'>
            <a className='littlelink' href={linkcontent} target='_blank' rel='noreferrer'>{linkname}</a>
            <button onClick={() => onDelete(id)} className='deletelinkbutton'>x</button>
        </div>
    )
}

export default SmallerAnotation;