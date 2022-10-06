import React, {useState, useEffect} from 'react'
import Router from "next/router";
import Head from 'next/head'
import {supabase} from '../utils/supabaseClient'
import NavBar from '../components/NavBar'
import PageFooter from '../components/PageFooter'
import LoadingPage from '../components/LoadingPage';
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const[user, setUser] = useState(null)
  const[loading, startLoad] = useState(false)
  const[loginrequest, reqlog] = useState(null)
  const[errorMessage, throwError] = useState(false)
  const[darkMode, setDarkMode] = useState(false)
  const[settable, releaseLocalStorage] = useState(false)
  const[project, setProject] = useState(false)
  const[passwordrecovery, setpassword] = useState(false)
  const [allGroups, setGroups] = useState([])
  const [allNotes, addNote] = useState([])
  const [allLists, addList] = useState([])
  const [allLinks, addLink] = useState([])
  const [allImages, addImage] = useState([])
  const [currentNote, changeCurrentNote] = useState('notas')
  const [currentPage, changeCurrentPage] = useState('home')

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
    addImage(await syncNotetype('images'))
    setGroups(await syncNotetype('grupos'))
    startLoad(false)
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
      if(pathname==='/password-recovery'){
        setpassword(true)
        return
      }
      if(!newUser){
        if(pathname==='/'){setProject(true)}
        throwError(true)
        if(pathname!=='/'){Router.push('/auth')}
        return
      }
      startLoad(true)
      Router.push('/home')
      changeCurrentPage('home')
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newUser.id)
        .single()
      setUser(data)
    }
    fetch()
  }, [loginrequest])

  if(loading){
    return(
      <div data-theme={darkMode?'dark':'light'}>
        <LoadingPage/>
      </div>
    )
  }
  if(!user||project||passwordrecovery){
  return(
    <div>
    <Head>
      <title>Nolt</title>
    </Head>
    <Component setpassword={setpassword} user={user} setProject={setProject} reqlog={reqlog} errorMessage={errorMessage} throwError={throwError}/>
    </div>
    )
  }
  return(
    <div data-theme={darkMode?'dark':'light'}>
    <Head>
      <title>Nolt</title>
    </Head>
    <NavBar user={user} currentNote={currentNote} currentPage={currentPage} changeCurrentNote={changeCurrentNote} changeCurrentPage={changeCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode}/>
    <main>
      <Component changeCurrentPage={changeCurrentPage} changeCurrentNote={changeCurrentNote} addNote={addNote} propNotes={allNotes} addList={addList} propLists={allLists} addLink={addLink} propLinks={allLinks} setGroups={setGroups} propGroups={allGroups}
      propImages={allImages} addImage={addImage} reqlog={reqlog} user={user} {...pageProps} errorMessage={errorMessage} throwError={throwError} darkMode={darkMode} setDarkMode={setDarkMode}/>
    </main>
    <PageFooter changeCurrentPage={changeCurrentPage} setProject={setProject}/>
    </div>
  )
}

export default MyApp