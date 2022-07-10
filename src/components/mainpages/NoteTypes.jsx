import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import Links from "./notetypes/Links"
import Lists from "./notetypes/Lists"
import Notes from "./notetypes/Notes"

function NoteTypes({visualclass, visualnote, onNoteAdded, currentNote, logged}) {
    function manageNote(noteReference){
        let classes = visualnote[noteReference]?'displayanotationswrapper':'displaynone'
        return classes
    }

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Anotações' extra={'/'+currentNote}/>
            <Notes logged={logged} onNoteRemoved={() => onNoteAdded('notas', -1)} 
            onNoteAdded={onNoteAdded} visualnote={manageNote('notas')}/>
            <Links logged={logged} onNoteRemoved={() => onNoteAdded('links', -1)} 
            onNoteAdded={onNoteAdded} visualnote={manageNote('links')}/>
            <Lists logged={logged} onNoteRemoved={() => onNoteAdded('listas', -1)} 
            onNoteAdded={onNoteAdded} visualnote={manageNote('listas')}/>
        </div>
    )
}

export default NoteTypes;