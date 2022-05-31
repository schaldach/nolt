import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import Links from "./notetypes/Links"
import Lists from "./notetypes/Lists"
import Notes from "./notetypes/Notes"

function NoteTypes({visualclass, visualnote}) {
    function manageNote(noteReference){
        let classes = visualnote[noteReference]?'':'displaynone'
        return classes
    }

    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Anotações'/>
            <Notes visualnote={manageNote('notas')}/>
            <Links visualnote={manageNote('links')}/>
            <Lists visualnote={manageNote('listas')}/>
        </div>
    )
}

export default NoteTypes;