import React, { useState } from "react"
import ListItem from "./ListItem";
import DropdownMenu from "./DropdownMenu"

function ListAnotation({title, content, onEdit, list, onDelete}) {
    const[editMode, startEdit] = useState(true)
    const[viewMode, startView] = useState(false)
    const[dropped, startDrop] = useState(false)

    function itemEdit(text, id){
        let newContent = [...content]
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        onEdit(title, newContent, list)
    }

    return (
        <div className={viewMode?'wholething view':'wholething'}>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, list)} placeholder='Título'/>
            </div>
            <div className='anotcontent'>
            {content.map(item =>
                <ListItem itemEdit={itemEdit} index={item.id} key={item.id} editMode={editMode} text={item.text}></ListItem>
            )}
            </div>
        </div>
        <DropdownMenu editMode={editMode} startEdit={startEdit} viewMode={viewMode}
        startView={startView} dropped={dropped} startDrop={startDrop} onDelete={() => onDelete(list.id)}/>
        </div>
    )
}

export default ListAnotation;