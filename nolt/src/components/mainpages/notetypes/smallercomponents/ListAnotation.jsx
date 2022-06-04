import React, { useState } from "react"
import ListItem from "./ListItem";

function ListAnotation({title, content, onEdit, list, onDelete}) {
    const[editMode, startEdit] = useState(true)

    function itemEdit(text, list2, id){
        let newContent = list2.content
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        onEdit(newContent, title, list2)
    }

    return (
        <div className='wholething'>
        <div className='functionality'>
            <button onClick={() => startEdit(!editMode)} className={editMode?' greenbutton functionbutton':'functionbutton'}>o</button>
            <button onClick={() => onDelete(list.id)} className='deletebutton functionbutton'>x</button>
        </div>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, list)} placeholder='Título'/>
            </div>
            <div>
            {content.map(item =>
                <ListItem itemEdit={itemEdit} key={item.id} list={list} editMode={editMode} text={item.text}></ListItem>
            )}
            </div>
        </div>
        </div>
    )
}

export default ListAnotation;