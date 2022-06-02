import React, { useState } from "react"
import Anotation from "./smallercomponents/Anotation"

function Notes({visualnote, onNoteAdded}) {
    const[allNotes,addNote] = useState([])
    const[latestId,addId] = useState(0)

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

    function onEdit(title,content,note){
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].title = title
        newNotes[index].content = content
        addNote(newNotes)
    }

    function onDelete(noteId){
        let newNotes = allNotes.filter(notes => notes.id!==noteId)
        addNote(newNotes)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={addAnotation}>+</button>
            {allNotes.map(note => 
                <Anotation note={note} onDelete={onDelete} onEdit={onEdit} key={note.id} title={note.title} content={note.content}></Anotation>
            )}
        </div>
    )
}

export default Notes;