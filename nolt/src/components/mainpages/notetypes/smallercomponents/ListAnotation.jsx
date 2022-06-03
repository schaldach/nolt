import React, { useState } from "react"
import ListItem from "./ListItem";

function ListAnotation({title, content, onEdit, note, onDelete}) {
    const[editMode, startEdit] = useState(true)

    return (
        <div className='wholething'>
        <div className='functionality'>
            <button onClick={() => startEdit(!editMode)} className={editMode?' greenbutton functionbutton':'functionbutton'}>o</button>
            <button onClick={() => onDelete(note.id)} className='deletebutton functionbutton'>x</button>
        </div>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, note)} placeholder='Título'/>
            </div>
            <div>
            {content.map(item =>
                <ListItem editMode={editMode} text={item} index={() => content.indexOf(item)}></ListItem>
            )}
            </div>
        </div>
        </div>
    )
}

export default ListAnotation;