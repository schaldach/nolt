import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import Anotation from "./smallercomponents/Anotation"

function Notes({ visualnote, onNoteAdded, onNoteRemoved }) {
    const [animation, startAnimation] = useState(false)
    const [allNotes, addNote] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)

    useEffect(() => {
        syncNotes()
    }, [])

    async function syncNotes() {
        conectionMade(2)
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
            .then( () => {
                conectionMade(0)
                console.log('eba')
            })
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
        conectionMade(1)
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
            <div className='flex'>
                <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                    <button className='savebutton' onClick={pulseAnimation}>Salvar Notas</button>
                </div>
                <div>
                    <div className={sucessAnimation==0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={sucessAnimation==1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={sucessAnimation==2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                </div>
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