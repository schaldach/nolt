import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import Anotation from "./smallercomponents/Anotation"

function Notes({ visualnote, onNoteAdded, onNoteRemoved }) {
    const [animation, startAnimation] = useState(false)
    const [allNotes, addNote] = useState([])

    useEffect(() => {
        syncNotes()
    }, [])

    async function syncNotes() {
        let oldNotes = []
        let newNotes = []
        allNotes.forEach(note => {
            if(note.isNew){
                newNotes.push({
                    title: note.title,
                    content: note.content
                })
            }
            else{oldNotes.push(note)}
        })
        console.log(newNotes)
        const bla = await supabase
            .from('notas')
            .upsert(newNotes, oldNotes)
            .then( async () => {
                const { data, count } = await supabase
                    .from('notas')
                    .select('*', { count: 'exact' })
                onNoteAdded('notas', count)
                addNote(data)
            }, (resp)=>{console.log(resp)})
    }

    function addAnotation() {
        let newNote = { title: '', content: '', id: Math.floor(Math.random() * 1000000000), isNew:true}
        addNote([...allNotes, newNote])
        onNoteAdded('notas', 1)
    }

    function onEdit(title, content, note) {
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].title = title
        newNotes[index].content = content
        addNote(newNotes)
    }

    function favorite(note, status) {
        let newNotes = allNotes.filter(notes => notes.id !== note.id)
        if (status) { newNotes.unshift(note) }
        else { newNotes.push(note) }
        addNote(newNotes)
    }

    async function onDelete(noteId) {
        let newNotes = allNotes.filter(notes => notes.id !== noteId)
        const { data } = await supabase
            .from('notas')
            .delete()
            .match({ id: noteId })
        onNoteRemoved()
        addNote(newNotes)
    }

    function pulseAnimation() {
        startAnimation(true)
        syncNotes()
    }

    return (
        <div className={visualnote}>
            <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                <button className='savebutton' onClick={pulseAnimation}>Salvar Notas</button>
            </div>
            <div className='displayanotations'>
                <button className='addanotation' onClick={addAnotation}>+</button>
                {allNotes.map(note =>
                    <Anotation favorite={favorite} note={note} onDelete={onDelete} onEdit={onEdit}
                        key={note.id} title={note.title} content={note.content} />
                )}
            </div>
        </div>
    )
}

export default Notes;