import React, { useState } from "react"
import Anotation from "./smallercomponents/Anotation"

function Notes({visualnote, onNoteAdded}) {
    const[allNotes,addNote] = useState([])
    const[latestId, addId] = useState(0)

    function addAnotation(){
        let newNotes = [...allNotes]
        newNotes.push({
            title: '',
            content: '',
            id: latestId
        })
        addId(latestId+1)
        addNote(newNotes)
        onNoteAdded()
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={addAnotation}>+</button>
            {allNotes.map(note => 
                <Anotation key={note.id} title={note.title} content={note.content}></Anotation>
            )}
        </div>
    )
}

export default Notes;