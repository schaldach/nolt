import React, { useState } from "react"
import DropdownMenu from "./DropdownMenu"

function Anotation({title, content, onEdit, note, onDelete}) {
    const[editMode, startEdit] = useState(true)
    const[viewMode, startView] = useState(false)
    const[dropped, startDrop] = useState(false)

    return (
        <div className={viewMode?'wholething view':'wholething'}>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, note.content, note)} placeholder='Título'/>
            </div>
            <div>
                <div className={!editMode?'anotcontent':'displaynone anotcontent'}>{content}</div>
                <textarea className={editMode?'anotcontent':'displaynone anotcontent'} type='text' 
                value={content} onInput={e => onEdit(note.title, e.target.value, note)} placeholder='Conteúdo'/>
            </div>
        </div>
        <DropdownMenu editMode={editMode} startEdit={startEdit} viewMode={viewMode}
        startView={startView} dropped={dropped} startDrop={startDrop} onDelete={() => onDelete(note.id)}/>
        </div>
    )
}

export default Anotation;