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
            <Notes onNoteAdded={() => onNoteAdded('notas')} visualnote={manageNote('notas')}/>
            <Links onNoteAdded={() => onNoteAdded('links')} visualnote={manageNote('links')}/>
            <Lists onNoteAdded={() => onNoteAdded('listas')} visualnote={manageNote('listas')}/>
        </div>
    )
}

export default NoteTypes;