import React, {useState, useEffect} from 'react'
import { Router } from 'next/router'
import {supabase} from '../utils/supabaseClient'
import Auth from '.'
import NavBar from '../components/NavBar'
import PageFooter from '../components/PageFooter'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const[user, setUser] = useState(null)
  const[loginrequest, reqlog] = useState(null)
  const[errorMessage, throwError] = useState(false)
  const[darkMode, setDarkMode] = useState(false)

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
      console.log(data)
    }
    fetch()
  }, [loginrequest])

  useEffect(() => throwError(false), [])

  if(!user){
    return <Auth reqlog={reqlog} errorMessage={errorMessage} throwError={throwError}/>
  }
  else{
    return(
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Component reqlog={reqlog} errorMessage={errorMessage} throwError={throwError} {...pageProps} />
      <PageFooter/>
    </>)
  }
}

export default MyApp