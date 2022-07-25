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
  const[syncrequest,reqsync] = useState(null)
  const[updaterequest, requpd] = useState(null)

  useEffect(() => {
    async function fetch(){
      const newUser = supabase.auth.user()
      if(!newUser){ 
        throwError(true)
        Router.push('/auth')
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
  }, [loginrequest, updaterequest])

  useEffect(() => throwError(false), [])

  if(!user){
    return <Component reqlog={reqlog} errorMessage={errorMessage} throwError={throwError}/>
  }
  return(
  <div data-theme={darkMode?'dark':'light'}>
    <Head>
      <title>Nolt</title>
    </Head>
    <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
    <main>
      <Component requpd={requpd} syncrequest={syncrequest} reqsync={reqsync} reqlog={reqlog} 
      errorMessage={errorMessage} throwError={throwError} user={user} {...pageProps} />
    </main>
    <PageFooter/>
  </div>
  )
}

export default MyApp