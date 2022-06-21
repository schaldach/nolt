import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import Links from "./notetypes/Links"
import Lists from "./notetypes/Lists"
import Notes from "./notetypes/Notes"

function NoteTypes({visualclass, visualnote, onNoteAdded, currentNote}) {
    function manageNote(noteReference){
        let classes = visualnote[noteReference]?'':'displaynone'
        return classes
    }

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Anotações' extra={'/'+currentNote}/>
            <Notes onNoteRemoved={() => onNoteAdded('notas', -1)} 
            onNoteAdded={() => onNoteAdded('notas', 1)} visualnote={manageNote('notas')}/>
            <Links onNoteRemoved={() => onNoteAdded('links', -1)} 
            onNoteAdded={() => onNoteAdded('links', 1)} visualnote={manageNote('links')}/>
            <Lists onNoteRemoved={() => onNoteAdded('listas', -1)} 
            onNoteAdded={() => onNoteAdded('listas', 1)} visualnote={manageNote('listas')}/>
        </div>
    )
}

export default NoteTypes;