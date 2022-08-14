import React, { useState, useRef } from "react"
import DropdownMenu from "./DropdownMenu"
import SecurityBox from "./SecurityBox"
import AnotationDate from "./AnotationDate"
import DisplayModes from "./DisplayModes"

function Anotation({title, content, onEdit, note, onDelete, favorite, onFavorite, calendar, onCalendar, onSchedule, date, small, onSmall}) {
    const[editMode, startEdit] = useState(!content||!title)
    const[viewMode, startView] = useState(false)
    const[boxVisible, setBox] = useState(false)
    const searchInput = useRef(null)

    function handleTextFocus(e){
        if(e.key==='Enter'){
            e.preventDefault()
            searchInput.current.focus()
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
        <div className={viewMode?'wholething view':'wholething'}>
        <DisplayModes editMode={editMode} favorite={favorite} calendar={calendar} viewMode={viewMode} small={small} />
        <div className={anotClass()}>
            <div>
                <div className={!editMode?'anottitle':'displaynone'}>{title}</div>
                <input onKeyDown={(e) => handleTextFocus(e)} className={editMode?'anottitle':'displaynone'} type='text' 
                value={title} onInput={e => onEdit(e.target.value, content, note)} placeholder='Título'/>
            </div>
            <div>
                <div className={!editMode?'anotcontent':'displaynone'}>{content}</div>
                <textarea ref={searchInput} className={editMode?'anotcontent':'displaynone'} type='text' 
                value={content} onInput={e => onEdit(title, e.target.value, note)} placeholder='Conteúdo'/>
            </div>
            <AnotationDate note={note} date={date} calendar={calendar} onSchedule={onSchedule} editMode={editMode}/>
        </div>
        <DropdownMenu editMode={editMode} onEdit={() => startEdit(!editMode)} viewMode={viewMode} favorite={favorite} 
        small={small} onSmall={() => onSmall(note)} calendar={calendar} onCalendar={() => onCalendar(note)} 
        onFavorite={() => onFavorite(note)} onView={() => startView(!viewMode)} onDelete={() => setBox(true)}/>
        </div>
        <SecurityBox onDelete={() => onDelete(note.id)} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </>
    )
}

export default Anotation;