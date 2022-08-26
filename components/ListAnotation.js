import React, { useState } from "react"
import ListItem from "./ListItem";
import DropdownMenu from "./DropdownMenu"
import SecurityBox from "./SecurityBox";
import DisplayModes from "./DisplayModes";

function ListAnotation({ title, content, onEdit, list, onDelete, favorite, onFavorite, small, onSmall, filtered, onFilter }) {
    const [editMode, startEdit] = useState(!title)
    const [viewMode, startView] = useState(false)
    const [boxVisible, setBox] = useState(false)
    const [currentItemFocus, changeFocus] = useState(-1)

    const incompletedItems = content.filter(item=>!item.complete)

    function itemEdit(text, id, complete) {
        let newContent = [...content]
        const index = newContent.findIndex(el => el.id === id)
        newContent[index].text = text
        newContent[index].complete = complete
        onEdit(title, newContent, list)
    }

    function handleTextFocus(e) {
        let rightContent = filtered?incompletedItems:content
        let rightIndex = content.indexOf(rightContent[currentItemFocus])
        if (e.key === 'Enter') {
            e.preventDefault()
            if (currentItemFocus + 1 === rightContent.length) {
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
        if(currentItemFocus === -1){return}
        if (e.key === 'Backspace'&&!rightContent[currentItemFocus].text) {
            e.preventDefault()
            let newContent = [...content]
            newContent.splice(rightIndex,1)
            for(let i=rightIndex; i<newContent.length; i++){
                newContent[i].id = i
                let newTextArray = newContent[i].text.split('.')
                if(newTextArray[0] === `${i+2}`){
                    newTextArray.shift()
                    newTextArray.unshift(`${i+1}`)
                    newContent[i].text = newTextArray.join('.')
                }
            }
            onEdit(title, newContent, list)
            changeFocus(currentItemFocus - 1)
        }
    }

    function anotClass(){
        let text = 'anot '
        if(editMode){text+='editting '}
        if(small){text+='smallanot'}
        return text 
    }

    return (
        <>
        <div className={viewMode?'disabledpage':''}>
        <div className={viewMode ? 'wholething view' : 'wholething'}>
            <DisplayModes filtered={filtered} editMode={editMode} favorite={favorite} viewMode={viewMode} small={small}/>
            <div className="displaycompleted">{content.filter(item => item.complete).length}/{content.length}</div>
            <div className={anotClass()}>
                <div>
                    <div className={!editMode ? 'anottitle' : 'displaynone anottitle'}>{title}</div>
                    <input onFocus={() => changeFocus(-1)} onKeyDown={(e) => handleTextFocus(e)} className={editMode ? 'anottitle' : 'displaynone anottitle'} type='text'
                        value={title} onInput={e => onEdit(e.target.value, content, list)} placeholder='Título' />
                </div>
                <div className='anotcontent'>
                    {content.map(item =>
                        <div className={!filtered||!item.complete?'':'displaynone'} key={item.id}>
                        <ListItem filtered={filtered} focusIndex={filtered?incompletedItems.indexOf(item):item.id} itemEdit={itemEdit} index={item.id} editMode={editMode}
                            text={item.text} changeFocus={changeFocus} handleTextFocus={handleTextFocus}
                            itemFocus={currentItemFocus} complete={item.complete}></ListItem>
                        </div>
                    )}
                    <div className={editMode ? 'listinstruction anotcontentwarning' : 'displaynone'}>Enter irá aumentar a lista 
                    ou ir para o próximo item<br/>Backspace em um item vazio irá removê-lo e atualizar os índices</div>
                </div>
            </div>
            <DropdownMenu noCalendar={true} editMode={editMode} onEdit={() => startEdit(!editMode)} viewMode={viewMode} favorite={favorite} 
            onFilter={() => onFilter(list)} filtered={filtered} small={small} onSmall={() => onSmall(list)} onFavorite={() => onFavorite(list)} onView={() => startView(!viewMode)} onDelete={() => setBox(true)}/>
        </div>
        <SecurityBox onDelete={() => onDelete(list.id)} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </div>
        </>
    )
}

export default ListAnotation;