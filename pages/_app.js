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
      if(pathname==='/'){setProject(true)}
      const newUser = supabase.auth.user()
      if(!newUser){ 
        throwError(true)
        if(pathname!=='/'){Router.push('/auth')}
        return
      }
      if(pathname!=='/'){Router.push('/home')}
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
      <Component reqlog={reqlog} user={user} {...pageProps} errorMessage={errorMessage} throwError={throwError}/>
    </main>
    <PageFooter setProject={setProject}/>
  </div>
  )
}

export default MyApp