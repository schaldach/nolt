import React, { useState, useEffect } from 'react'
import Contact from './mainpages/Contact.jsx'
import Home from './mainpages/Home.jsx'
import NavBar from './mainpages/NavBar.jsx'
import NoteTypes from './mainpages/NoteTypes.jsx'
import PageFooter from './mainpages/PageFooter.jsx'
import ProjectDesc from './mainpages/ProjectDesc.jsx'

function App() {
  const[pagesVisible, setPages] = useState({
    home: true,
    notetypes: false,
    project: false,
    contact: false,
  })
  const[notesVisible, setNoteType] = useState({
    notes: true,
    lists: false,
    links: false,
  })
  const[currentNote, changeCurrentNote] = useState('Notas')
  const[notesNumbers, changeNotesNumbers] = useState({
    notes: 0,
    lists: 0,
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

  function manageShownNote(){
    let newNote = ''
    for(let note in notesVisible){
      if(notesVisible[note]){
        newNote += JSON.stringify(note)==='"notes"'?'Notas':''
        newNote += JSON.stringify(note)==='"links"'?'Links':''
        newNote += JSON.stringify(note)==='"lists"'?'Listas':''
      }
    }
    changeCurrentNote(newNote)
    console.log('manage called!')
  }

  useEffect(() => manageShownNote(), [notesVisible])

  return (
    <>
      <NavBar currentNote={currentNote} notesVisible={notesVisible} pagesVisible={pagesVisible} onPageChange={changePage} onNoteChange={changeNoteType}/>
      <main>
        <Home notesNumbers={notesNumbers} visualclass={manageDisplay('home')}/>
        <NoteTypes manageShownNote={manageShownNote} visualnote={notesVisible} visualclass={manageDisplay('notetypes')}/>
        <ProjectDesc visualclass={manageDisplay('project')}/>
        <Contact visualclass={manageDisplay('contact')}/>
      </main>
      <PageFooter/>
    </>
  )
}

export default App;
