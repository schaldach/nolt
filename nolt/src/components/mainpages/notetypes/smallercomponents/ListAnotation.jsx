import React, { useState } from "react"
import ListItem from "./ListItem";
import DropdownMenu from "./DropdownMenu"

function ListAnotation({title, content, onEdit, list, onDelete}) {
    const[editMode, startEdit] = useState(true)
    const[viewMode, startView] = useState(false)
    const[currentItemFocus, changeFocus] = useState(-1)

    function itemEdit(text, id){
        let newContent = [...content]
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        onEdit(title, newContent, list)
    }

    function handleTextFocus(e){
        if(e.key==='Enter'){
            e.preventDefault()
            if(currentItemFocus+1===content.length){
                let newContent = [...content]
                newContent.push({
                    text: `${content.length+1}. `,
                    id: content.length
                })
                onEdit(title, newContent, list)
            }
            changeFocus(currentItemFocus+1)
        }
    }

    return (
        <div className={viewMode?'wholething view':'wholething'} onDoubleClick={() => startEdit(!editMode)}>
        <div className={editMode?'anot editting':'anot'}>
            <div>
                <div className={!editMode?'anottitle':'displaynone anottitle'}>{title}</div>
                <input onFocus={() => changeFocus(-1)} onKeyDown={(e) => handleTextFocus(e)} autoFocus className={editMode?'anottitle':'displaynone anottitle'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, list)} placeholder='Título'/>
            </div>
            <div className='anotcontent'>
            {content.map(item =>
                <ListItem itemEdit={itemEdit} index={item.id} key={item.id} editMode={editMode} 
                text={item.text} changeFocus={changeFocus} handleTextFocus={handleTextFocus} 
                itemFocus={currentItemFocus}></ListItem>
            )}
            <div className={editMode?'listinstruction':'displaynone listinstruction'}>Aperte 'Enter' para aumentar a lista</div>
            </div>
        </div>
        <DropdownMenu editMode={editMode} startEdit={startEdit} viewMode={viewMode}
        startView={startView} onDelete={() => onDelete(list.id)} />
        </div>
    )
}

export default ListAnotation;