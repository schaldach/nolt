import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import Anotation from "../components/Anotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"
import AddButton from "../components/AddButton"

function Notes({user, allNotes, addNote}) {
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(false)
    const [dateChanged, callChange] = useState(false)

    useInterval(() => {syncNotes(allNotes, true)},2500)

    useEffect(() => {
        if(dateChanged){
            let newNotes = [...allNotes]
            newNotes.sort((a,b) => {
                if(!a.calendar&&!b.calendar){return a.id - b.id}
                if(!a.calendar||!b.calendar){return a.calendar?-1:1}
                return new Date(a.date) - new Date(b.date)
            })
            addNote(newNotes)
            callChange(false)
        }
    }, [dateChanged])

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
                    data.sort((a,b) => {
                        if(!a.calendar&&!b.calendar){return a.id - b.id}
                        if(!a.calendar||!b.calendar){return a.calendar?-1:1}
                        return new Date(a.date) - new Date(b.date)
                    })
                    addNote(data)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    async function addAnotation() {
        conectionMade(2)
        setChange(true)
        let newNote = {title: '', content: '', favorite:false, userid: user.id, calendar:false}
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
        callChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].date = date
        addNote(newNotes)
        conectionMade(1)
    }

    function onSmall(note){
        setChange(true)
        let newNotes = [...allNotes]
        const index = newNotes.indexOf(note)
        newNotes[index].small = !newNotes[index].small
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
                <AddButton addAnotation={addAnotation}/>
                {allNotes.map(note =>
                    <Anotation onFavorite={onFavorite} favorite={note.favorite} note={note} onDelete={onDelete} onEdit={onEdit}
                    onSmall={onSmall} small={note.small} date={note.date} onSchedule={onSchedule} calendar={note.calendar} onCalendar={onCalendar} key={note.id} title={note.title} content={note.content} />
                )}
            </div>
        </div>
    )
}

export default Notes;