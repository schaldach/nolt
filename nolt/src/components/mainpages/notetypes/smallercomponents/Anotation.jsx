import React, { useState, useRef } from "react"
import DropdownMenu from "./DropdownMenu"

function Anotation({title, content, onEdit, note, onDelete}) {
    const[editMode, startEdit] = useState(true)
    const[viewMode, startView] = useState(false)
    const searchInput = useRef(null)

    function handleTextFocus(e){
        if(e.key==='Enter'){
            e.preventDefault()
            searchInput.current.focus()
        }
    }

    return (
        <div className={viewMode?'wholething view':'wholething'} onDoubleClick={() => startEdit(!editMode)}>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input onKeyDown={(e) => handleTextFocus(e)} autoFocus className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, note)} placeholder='Título'/>
            </div>
            <div>
                <div className={!editMode?'anotcontent':'displaynone anotcontent'}>{content}</div>
                <textarea ref={searchInput} className={editMode?'anotcontent':'displaynone anotcontent'} type='text' 
                value={content} onInput={e => onEdit(title, e.target.value, note)} placeholder='Conteúdo'/>
            </div>
        </div>
        <DropdownMenu editMode={editMode} startEdit={startEdit} viewMode={viewMode}
        startView={startView} onDelete={() => onDelete(note.id)}/>
        </div>
    )
}

export default Anotation;