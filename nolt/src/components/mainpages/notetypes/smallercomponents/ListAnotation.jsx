import React, { useState } from "react"
import ListItem from "./ListItem";

function ListAnotation({title, content, onEdit, list, onDelete}) {
    const[editMode, startEdit] = useState(true)

    function itemEdit(text, id){
        let newContent = [...content]
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        onEdit(title, newContent, list)
    }

    return (
        <div className='wholething'>
            <div className='functionality'>
                <button onClick={() => startEdit(!editMode)} 
                className={editMode?' greenbutton editimg functionbutton':'editimg functionbutton'}></button>
                <button onClick={() => onDelete(list.id)} className='deletebutton functionbutton'>x</button>
                <button className='dropdownbutton functionbutton'></button>
            </div>
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
        </div>
    )
}

export default ListAnotation;