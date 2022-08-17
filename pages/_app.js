import React, {useState, useEffect} from 'react'
import Router from "next/router";
import Head from 'next/head'
import {supabase} from '../utils/supabaseClient'
import NavBar from '../components/NavBar'
import PageFooter from '../components/PageFooter'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const[user, setUser] = useState(null)
  const[loginrequest, reqlog] = useState(null)
  const[errorMessage, throwError] = useState(false)
  const[darkMode, setDarkMode] = useState(false)
  const[settable, releaseLocalStorage] = useState(false)
  const[project, setProject] = useState(false)
  const [allGroups, setGroups] = useState([])
  const [allNotes, addNote] = useState([])
  const [allLists, addList] = useState([])
  const [allLinks, addLink] = useState([])

  useEffect(()=> {
    syncAnotations()
  }, [user])

  async function syncNotetype(notetype){
    const { data } = await supabase
        .from(notetype)
        .select('*')
        .eq('userid', user.id)
      data.sort((a,b) => {
        if(notetype==='notas'){
            if(!a.calendar&&!b.calendar){return a.id - b.id}
            if(!a.calendar||!b.calendar){return a.calendar?-1:1}
            return new Date(a.date) - new Date(b.date)
        }
        return a.id-b.id
    })
    return(data)
  }

  async function syncAnotations(){
    if(!user){return}
    addNote(await syncNotetype('notas'))
    addList(await syncNotetype('listas'))
    addLink(await syncNotetype('links'))
    setGroups(await syncNotetype('grupos'))
  }

  useEffect(() => {
    let storedDarkMode = JSON.parse(localStorage.getItem('dark'))
    setDarkMode(storedDarkMode)
    releaseLocalStorage(true)
  }, [])

  useEffect(() => {
    if(settable){
      localStorage.setItem('dark', JSON.stringify(darkMode))
    }
  }, [darkMode])

  useEffect(() => {
    async function fetch(){
      const router = Router
      let {pathname} = router
      const newUser = supabase.auth.user()
      if(!newUser){
        if(pathname==='/'){setProject(true)}
        throwError(true)
        if(pathname!=='/'){Router.push('/auth')}
        return
      }
      Router.push('/home')
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newUser.id)
        .single()
      setUser(data)
    }
    fetch()
  }, [loginrequest])

  if(!user||project){
    return(
    <div>
      <Head>
        <title>Nolt</title>
      </Head>
      <Component user={user} setProject={setProject} reqlog={reqlog} errorMessage={errorMessage} throwError={throwError}/>
    </div> 
    )
  }
  return(
  <div data-theme={darkMode?'dark':'light'}>
    <Head>
      <title>Nolt</title>
    </Head>
    <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
    <main>
      <Component addNote={addNote} allNotes={allNotes} addList={addList} allLists={allLists} addLink={addLink} allLinks={allLinks} setGroups={setGroups} allGroups={allGroups}
      reqlog={reqlog} user={user} {...pageProps} errorMessage={errorMessage} throwError={throwError}/>
    </main>
    <PageFooter setProject={setProject}/>
  </div>
  )
}

export default MyApp