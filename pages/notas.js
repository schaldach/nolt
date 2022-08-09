import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import Anotation from "../components/Anotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Notes({user}) {
    const [allNotes, addNote] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncNotes(allNotes, true)},2500)

    useEffect(() => {
        syncNotes(allNotes)
    }, [user])

    async function syncNotes(notes, auto) {
        if(!user||!changed&&auto){return}
        conectionMade(2)
        const bla = await supabase
            .from('notas')
            .upsert(notes)
            .then( async () => {
                if(!auto){
                    const { data } = await supabase
                        .from('notas')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return new Date(a.date) - new Date(b.date)})
                    addNote(formattedData)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    async function addAnotation() {
        conectionMade(2)
        setChange(true)
        let newNote = {title: '', content: '', favorite:false, userid: user.id, calendar:true}
        const bla = await supabase
            .from('notas')
            .insert([newNote])
            .then(() => syncNotes(allNotes))
    }

    function onEdit(title, content, note) {
        setChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].title = title
        newNotes[index].content = content
        addNote(newNotes)
        conectionMade(1)
    }

    function onFavorite(note) {
        setChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].favorite = !newNotes[index].favorite
        addNote(newNotes)
        conectionMade(1)
    }

    function onCalendar(note){
        setChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].calendar = !newNotes[index].calendar
        addNote(newNotes)
        conectionMade(1)
    }

    function onSchedule(note, date){
        if(!date){return}
        setChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].date = date
        addNote(newNotes)
        conectionMade(1)
    }

    async function onDelete(noteId) {
        let lastconection = successAnimation
        conectionMade(2)
        let newNotes = allNotes.filter(notes => notes.id !== noteId)
        const eba = await supabase
            .from('notas')
            .delete()
            .match({ id: noteId })
            .then( () => {
                conectionMade(lastconection)
            })
        addNote(newNotes)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Notas'/>
            <InfoBox successAnimation={successAnimation}/>
            </div>
            <div className='displayanotations'>
                <button className='addanotation' onClick={addAnotation}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allNotes.map(note =>
                    <Anotation onFavorite={onFavorite} favorite={note.favorite} note={note} onDelete={onDelete} onEdit={onEdit}
                    date={note.date} onSchedule={onSchedule} calendar={note.calendar} onCalendar={onCalendar} key={note.id} title={note.title} content={note.content} />
                )}
            </div>
        </div>
    )
}

export default Notes;