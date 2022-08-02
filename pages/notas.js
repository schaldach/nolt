import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import Anotation from "../components/Anotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Notes({user}) {
    const [allNotes, addNote] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncNotes(allNotes, false, true)},5000)

    useEffect(() => {
        syncNotes(allNotes)
    }, [user])

    async function syncNotes(notes, click, auto) {
        if(!user||!clickable||(!changed&&!click)){return}
        setClick(false)
        conectionMade(2)
        let oldNotes = []
        let newNotes = []
        notes.forEach(note => {
            if(note.isNew){
                newNotes.push({
                    title: note.title,
                    content: note.content,
                    favorite: note.favorite,
                    userid: user.id
                })
            }
            else{oldNotes.push(note)}
        })
        const bla = await supabase
            .from('notas')
            .upsert(oldNotes)
            .then( async () => {
                const bla = await supabase
                    .from('notas')
                    .upsert(newNotes)
            })
            .then( async () => {
                let anyNew = false
                notes.forEach(note => {if(note.isNew){anyNew=true}})
                if(!auto||anyNew){
                    const { data } = await supabase
                        .from('notas')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return a.id-b.id})
                    addNote(formattedData)
                }
                conectionMade(0)
                setClick(true)
                setChange(false)
            })
    }

    function addAnotation() {
        setChange(true)
        let newNote = { title: '', content: '', id: Math.floor(Math.random() * 9999999999), isNew:true, favorite:false}
        addNote([...allNotes, newNote])
        conectionMade(1)
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
                        key={note.id} title={note.title} content={note.content} />
                )}
            </div>
        </div>
    )
}

export default Notes;