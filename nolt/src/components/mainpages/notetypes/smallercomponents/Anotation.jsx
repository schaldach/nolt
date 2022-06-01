import React, { useState } from "react"

function Anotation({title, content}) {
    const[editMode, startEdit] = useState(true)
    
    function manageEdit(){
        let classes = !editMode?'':'displaynone'
        return classes
    }
    function manageEditInput(){
        let classes = editMode?'':'displaynone'
        return classes
    }

    return (
        <div className='anot'>
            <div className='anottitle'>
                <div className={manageEdit()}>{title}</div>
                <input className={manageEditInput()} placeholder={title}/>
            </div>
            <div className='anotcontent'>
                <div className={manageEdit()}>{content}</div>
                <input className={manageEditInput()} placeholder={content}/>
            </div>
        </div>
    )
}

export default Anotation;