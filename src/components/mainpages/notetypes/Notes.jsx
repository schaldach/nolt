import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import Anotation from "./smallercomponents/Anotation"

function Notes({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allNotes,addNote] = useState([])
    const[latestId,addId] = useState(1)

    useEffect(() => {
        fetchNotes()
    }, [])

    async function fetchNotes(){
        const { data, count } = await supabase
            .from('notas')
            .select('*', { count: 'exact' })
        console.log(count)
        onNoteAdded('notas', count)
        addId(1+count)
        addNote(data)
    }

    function addAnotation(){
        let newNotes = [...allNotes]
        newNotes.push({
            title: '',
            content: '',
            id: latestId
        })
        addId(latestId+1)
        addNote(newNotes)
        onNoteAdded('notas', 1)
    }

    function onEdit(title,content,note){
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].title = title
        newNotes[index].content = content
        addNote(newNotes)
    }

    function favorite(note, status){
        let newNotes = allNotes.filter(notes => notes.id!==note.id)
        if(status){newNotes.unshift(note)}
        else{newNotes.push(note)}
        addNote(newNotes)
    }

    function onDelete(noteId){
        let newNotes = allNotes.filter(notes => notes.id!==noteId)
        onNoteRemoved()
        addNote(newNotes)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={addAnotation}>+</button>
            {allNotes.map(note => 
                <Anotation favorite={favorite} note={note} onDelete={onDelete} onEdit={onEdit} 
                key={note.id} title={note.title} content={note.content}/>
            )}
        </div>
    )
}

export default Notes;