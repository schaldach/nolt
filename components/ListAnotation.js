import React, { useState } from "react"
import ListItem from "./ListItem";
import DropdownMenu from "./DropdownMenu"

function ListAnotation({ title, content, onEdit, list, onDelete, favorite, onFavorite }) {
    const [editMode, startEdit] = useState(list.isNew)
    const [viewMode, startView] = useState(false)
    const [currentItemFocus, changeFocus] = useState(-1)

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
        <div className={viewMode ? 'wholething view' : 'wholething'}>
            <div className="displaymodes">
            <svg xmlns="http://www.w3.org/2000/svg" className={editMode?'modesvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={viewMode?'modesvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={favorite?'modesvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
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
                    <div className={editMode ? 'listinstruction anotcontentwarning' : 'displaynone'}>Aperte Enter para aumentar a lista ou ir para o próximo item</div>
                </div>
            </div>
            <DropdownMenu editMode={editMode} onEdit={() => startEdit(!editMode)} viewMode={viewMode} favorite={favorite} 
            onFavorite={() => onFavorite(list)} onView={() => startView(!viewMode)} onDelete={() => onDelete(list.id)}/>
        </div>
    )
}

export default ListAnotation;