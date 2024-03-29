import SimpleAnotation from "./SimpleAnotation";
import SimpleList from "./SimpleList";
import SimpleLink from "./SimpleLink";
import PreviewNotes from "./PreviewNotes"
import PreviewLists from "./PreviewLists";
import PreviewLinks from "./PreviewLinks";
import SecurityBox from './SecurityBox'
import SimpleImage from './SimpleImage'
import PreviewImages from "./PreviewImages";
import { useState } from "react";

function Group({allNotes, allLists, allLinks, allImages, notes, lists, links, images, title, onEdit, group, onFavorite, favorite, onDelete}) {
    const [editMode, setEdit] = useState(!(notes.length+lists.length+links.length+images.length||title))
    const [boxVisible, setBox] = useState(false)
    const [notesBox, showNotes] = useState(false)
    const [listsBox, showLists] = useState(false)
    const [linksBox, showLinks] = useState(false)
    const [imagesBox, showImages] = useState(false)

    function addNote(note){
        let newNotes = [...group['notes']]
        if(newNotes.indexOf(note.id)!==-1){
            newNotes.splice(newNotes.indexOf(note.id), 1)
        }
        else{
            newNotes.push(note.id)
        }
        onEdit(group, title, newNotes, 'notes')
    }

    function addList(list){
        let newLists = [...group['lists']]
        if(newLists.indexOf(list.id)!==-1){
            newLists.splice(newLists.indexOf(list.id), 1)
        }
        else{
            newLists.push(list.id)
        }
        onEdit(group, title, newLists, 'lists')
    }

    function addLink(link){
        let newLinks = [...group['links']]
        if(newLinks.indexOf(link.id)!==-1){
            newLinks.splice(newLinks.indexOf(link.id), 1)
        }
        else{
            newLinks.push(link.id)
        }
        onEdit(group, title, newLinks, 'links')
    }

    function addImage(image){
        let newImages = [...group['images']]
        if(newImages.indexOf(image.id)!==-1){
            newImages.splice(newImages.indexOf(image.id), 1)
        }
        else{
            newImages.push(image.id)
        }
        onEdit(group, title, newImages, 'images')
    }

    return (
        <>
        <div className="group">
            <div className="grouptitle">
                <div className={!editMode?"":'displaynone'}>{title}</div>
                <input className={editMode?"titleinput":'displaynone'} placeholder='Nome do grupo' 
                value={title} onChange={e => onEdit(group, e.target.value)}></input>
                <button onClick={() => setEdit(!editMode)} className={editMode?'':'idlefunction'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' fill="none" viewBox="0 0 24 24" stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button onClick={onFavorite} className={favorite?'':'idlefunction'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='dropdownsvg' fill='none' viewBox="0 0 24 24" stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
                <button className="groupdeletebutton" onClick={() => setBox(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdownsvg" fill="none" viewBox="0 0 24 24" stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            {editMode?<div className="addbuttonswrapper">
            <button className='addbuttongroups' onClick={() => showNotes(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
            </button>
            <button className='addbuttongroups' onClick={() => showLists(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
            </button>
            <button className='addbuttongroups' onClick={() => showLinks(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
            </button>
            <button className='addbuttongroups' onClick={() => showImages(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            </button>
            </div>:''}
            <div className={notes.length+lists.length+images.length||editMode?"specificgroup":'displaynone'}>
                {notes.map(note => 
                    <SimpleAnotation small={note.small} calendar={note.calendar} date={note.date} key={note.id} title={note.title} content={note.content}/>
                )}
                {lists.map(list => 
                    <SimpleList filtered={list.filtered} small={list.small} key={list.id} title={list.title} content={list.content}/>
                )}
                {images.map(image => 
                    <SimpleImage storageurl={image.storageurl} key={image.id}/>
                )}
            </div>
            <div className={links.length||editMode?"specificgroup":'displaynone'}>
                {links.map(link => 
                    <SimpleLink key={link.id} href={link.href} name={link.name}/>
                )}
            </div>
            {notesBox?<PreviewNotes addNote={addNote} type='Notas' notesBox={notesBox} notes={notes} allNotes={allNotes} showNotes={showNotes}/>:''}
            {imagesBox?<PreviewImages addImage={addImage} type='Fotos' imagesBox={imagesBox} images={images} allImages={allImages} showImages={showImages}/>:''}
            {listsBox?<PreviewLists addList={addList} type='Listas' listsBox={listsBox} lists={lists} allLists={allLists} showLists={showLists}/>:''}
            {linksBox?<PreviewLinks addLink={addLink} type='Links' linksBox={linksBox} links={links} allLinks={allLinks} showLinks={showLinks}/>:''}
            <div className={notes.length+lists.length+links.length+images.length||editMode?'displaynone':'empty'}>O grupo está vazio...</div>
        </div>
        <SecurityBox onDelete={onDelete} onCancel={() => setBox(false)} boxVisible={boxVisible}/>
        </>
    );
}

export default Group;