import React, { useState, useRef } from "react"
import DropdownMenu from "./DropdownMenu"
import SecurityBox from "./SecurityBox"
import AnotationDate from "./AnotationDate"

function Anotation({title, content, onEdit, note, onDelete, favorite, onFavorite, calendar, onCalendar, onSchedule}) {
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

    return (
        <>
        <div className={viewMode?'wholething view':'wholething'}>
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
            <svg xmlns="http://www.w3.org/2000/svg" className={calendar?'modesvg':'displaynone'} viewBox="0 0 20 20" fill="var(--color3)">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
        </div>
        <div className={editMode?'anot editting':'anot'}>
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
            <AnotationDate calendar={calendar} onSchedule={onSchedule} editMode={editMode}/>
        </div>
        <DropdownMenu editMode={editMode} onEdit={() => startEdit(!editMode)} viewMode={viewMode} favorite={favorite} 
        calendar={calendar} onCalendar={() => onCalendar(note)} onFavorite={() => onFavorite(note)} onView={() => startView(!viewMode)} onDelete={() => setBox(true)}/>
        </div>
        <SecurityBox onDelete={() => onDelete(note.id)} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </>
    )
}

export default Anotation;