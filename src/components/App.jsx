import React, { useState, useEffect } from 'react'
import Profile from './mainpages/Profile.jsx'
import Home from './mainpages/Home.jsx'
import NavBar from './mainpages/NavBar.jsx'
import NoteTypes from './mainpages/NoteTypes.jsx'
import PageFooter from './mainpages/PageFooter.jsx'
import ProjectDesc from './mainpages/ProjectDesc.jsx'
import Auth from './mainpages/Auth.jsx'
import { supabase } from './mainpages/notetypes/SupaBaseClient'

function App() {
  const[logged, performAuth] = useState(false)
  const[loginrequest, reqlog] = useState(null)
  const[user, setUser] = useState(null)
  const[errorMessage, throwError] = useState(false)
  const[darkMode, setDarkMode] = useState(true)
  const[pagesVisible, setPages] = useState({
    home: true,
    notetypes: false,
    project: false,
    profile: false,
  })
  const[notesVisible, setNoteType] = useState({
    notas: true,
    listas: false,
    links: false,
  })
  const[currentNote, changeCurrentNote] = useState('Notas')
  const[notesNumbers, changeNotesNumbers] = useState({
    notas: 0,
    listas: 0,
    links: 0,
  })

  function changePage(pageReference){
    let newPages = JSON.parse(JSON.stringify(pagesVisible))
    for(let page in newPages){
      newPages[page] = false
    }
    newPages[pageReference] = true
    setPages(newPages)
  }

  function changeNoteType(noteReference){
    let newNotes = JSON.parse(JSON.stringify(notesVisible))
    for(let note in newNotes){
      newNotes[note] = false
    }
    newNotes[noteReference] = true
    setNoteType(newNotes)
  }

  function manageDisplay(pageReference){
    let classes = pagesVisible[pageReference]?'':'displaynone '
    return classes
  }

  function addNote(type, number, priority){
    changeNotesNumbers(prevState => {
      return {
        ...prevState,
        [type]: priority?number:prevState[type]+number
      }
    })
}

  function manageShownNote(){
    let newNote = ''
    for(let note in notesVisible){
      if(notesVisible[note]){
        let string = JSON.stringify(note)
        newNote = string.charAt(1).toUpperCase() + string.slice(2,string.length-1);
      }
    }
    changeCurrentNote(newNote)
  }

  useEffect(() => manageShownNote(), [notesVisible])
  useEffect(() => {
    async function fetch(){
      const user = supabase.auth.user()
      if(!user){ 
        throwError(true)
        return
      }
      console.log(user)
      performAuth(true)
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setUser(data)
    }
    fetch()
  }, [loginrequest])
  useEffect(() => {throwError(false)}, [])

  return (
    <div data-theme={darkMode?'dark':'light'}>
    <div className={logged?'displaynone':''}>
      <Auth errorMessage={errorMessage} throwError={throwError} reqlog={reqlog}></Auth>
    </div>
    <div className={logged?'':'displaynone'}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} currentNote={currentNote} notesVisible={notesVisible} pagesVisible={pagesVisible} onPageChange={changePage} onNoteChange={changeNoteType}/>
      <main>
        <Home user={user} onPageChange={changePage} notesNumbers={notesNumbers} visualclass={manageDisplay('home')}/>
        <NoteTypes user={user} currentNote={currentNote} onNoteAdded={addNote} manageShownNote={manageShownNote} visualnote={notesVisible} visualclass={manageDisplay('notetypes')}/>
        <ProjectDesc visualclass={manageDisplay('project')}/>
        <Profile user={user} visualclass={manageDisplay('profile')} performAuth={performAuth}/>
      </main>
      <PageFooter/>
    </div>
    </div>
  )
}

export default App;
