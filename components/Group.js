import SimpleAnotation from "./SimpleAnotation";
import SimpleList from "./SimpleList";
import SimpleLink from "./SimpleLink";
import PreviewNotes from "./PreviewNotes"
import PreviewLists from "./PreviewLists";
import PreviewLinks from "./PreviewLinks";
import SecurityBox from '../components/SecurityBox'
import { useState } from "react";

function Group({allNotes, allLists, allLinks, notes, lists, links, title, onEdit, group, onFavorite, favorite, onDelete}) {
    const [editMode, setEdit] = useState(group.isNew)
    const [boxVisible, setBox] = useState(false)
    const [notesBox, showNotes] = useState(false)
    const [listsBox, showLists] = useState(false)
    const [linksBox, showLinks] = useState(false)

    return (
        <>
        <div className="group">
            <div className="grouptitle">
                <div className={!editMode?"":'displaynone'}>{title}</div>
                <input className={editMode?"titleinput":'displaynone'} placeholder='Nome do grupo' 
                value={title} onChange={e => onEdit(group, e.target.value)}></input>
                <button onClick={() => setEdit(!editMode)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke={editMode ? 'var(--color4)' : 'currentColor'} strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button onClick={onFavorite}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill='none' viewBox="0 0 24 24" stroke={favorite?'var(--color4)':'currentColor'} strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
                <button onClick={() => setBox(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            <div className="specificgroup">
                <button className={editMode?'addanotation':'displaynone'} onClick={() => showNotes(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {notes.map(note => 
                    <SimpleAnotation key={note.id} title={note.title} content={note.content}/>
                )}
            </div>
            <PreviewNotes notesBox={notesBox} allNotes={allNotes} showNotes={showNotes}/>
            <div className="specificgroup">
                <button className={editMode?'addanotation':'displaynone'} onClick={() => showLists(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {lists.map(list => 
                    <SimpleList key={list.id} title={list.title} content={list.content}/>
                )}
            </div>
            <PreviewLists listsBox={listsBox} allLists={allLists} showLists={showLists}/>
            <div className="specificgroup">
                <button className={editMode?'linkbutton':'displaynone'} onClick={() => showLinks(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvglink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {links.map(link => 
                    <SimpleLink key={link.id} href={link.href} name={link.name}/>
                )}
            </div>
            <PreviewLinks linksBox={linksBox} allLinks={allLinks} showLinks={showLinks}/>
            <div className='empty'>{notes.length+lists.length+links.length?'':'O grupo está vazio...'}</div>
        </div>
        <SecurityBox onDelete={onDelete} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </>
    );
}

export default Group;