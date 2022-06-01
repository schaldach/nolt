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
            <div>
                <div className={manageEdit()+' anottitle'}>{title}</div>
                <input className={manageEditInput()+' anottitle'} placeholder='Título'/>
            </div>
            <div>
                <div className={manageEdit()+' anotcontent'}>{content}</div>
                <textarea className={manageEditInput()+' anotcontent'} placeholder='Conteúdo'/>
            </div>
        </div>
    )
}

export default Anotation;