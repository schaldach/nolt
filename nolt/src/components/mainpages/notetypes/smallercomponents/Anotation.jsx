import React, { useState } from "react"

function Anotation({title, content, onEdit, note, onDelete}) {
    const[editMode, startEdit] = useState(true)

    return (
        <div>
        <div className='functionality'>
            <button onClick={() => startEdit(!editMode)} className={editMode?' greenbutton functionbutton':'functionbutton'}>o</button>
            <button onClick={() => onDelete(note.id)} className='deletebutton functionbutton'>x</button>
        </div>
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
        </div>
    )
}

export default Anotation;