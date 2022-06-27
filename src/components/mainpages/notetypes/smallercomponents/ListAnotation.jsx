import React, { useState, useEffect } from "react"
import ListItem from "./ListItem";
import DropdownMenu from "./DropdownMenu"

function ListAnotation({ title, content, onEdit, list, onDelete, favorite }) {
    const [editMode, startEdit] = useState(true)
    const [viewMode, startView] = useState(false)
    const [favstatus, startFavorite] = useState(false)
    const [currentItemFocus, changeFocus] = useState(-1)

    useEffect(() => {
        favorite(list, favstatus)
    }, [favstatus])

    function itemEdit(text, id, complete) {
        let newContent = [...content]
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        newContent[index].complete = complete
        onEdit(title, newContent, list)
    }

    function handleTextFocus(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (currentItemFocus + 1 === content.length) {
                let newContent = [...content]
                newContent.push({
                    text: `${content.length + 1}. `,
                    id: content.length,
                    complete: false
                })
                onEdit(title, newContent, list)
            }
            changeFocus(currentItemFocus + 1)
        }
    }

    return (
        <div className={viewMode ? 'wholething view' : 'wholething'} onDoubleClick={() => startEdit(!editMode)}>
            <div className={editMode ? 'anot editting' : 'anot'}>
                <div>
                    <div className={!editMode ? 'anottitle' : 'displaynone anottitle'}>{title}</div>
                    <input onFocus={() => changeFocus(-1)} onKeyDown={(e) => handleTextFocus(e)} className={editMode ? 'anottitle' : 'displaynone anottitle'} type='text'
                        value={title} onInput={e => onEdit(e.target.value, content, list)} placeholder='Título' />
                </div>
                <div className='anotcontent'>
                    {content.map(item =>
                        <ListItem itemEdit={itemEdit} index={item.id} key={item.id} editMode={editMode}
                            text={item.text} changeFocus={changeFocus} handleTextFocus={handleTextFocus}
                            itemFocus={currentItemFocus} complete={item.complete}></ListItem>
                    )}
                    <div className={editMode ? 'listinstruction anotcontentwarning' : 'displaynone'}>Aperte 'Enter' para aumentar a lista ou ir para o próximo item</div>
                </div>
            </div>
            <DropdownMenu editMode={editMode} startEdit={startEdit} viewMode={viewMode} favstatus={favstatus}
            startView={startView} onDelete={() => onDelete(list.id)} onFavorite={startFavorite}/>
        </div>
    )
}

export default ListAnotation;