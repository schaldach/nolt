import React, { useEffect } from "react"
import SecondTitle from "../components/SecondTitle"
import { supabase } from "../utils/supabaseClient"
import { useState } from "react"
import InfoBox from '../components/InfoBox'
import Router from 'next/router'
import DarkModeButton from "../components/DarkModeButton"

function Profile({user, reqlog, darkMode, setDarkMode}) {
    const profileUser = user?user:''
    const email = user?user.email:''
    const [username, setUsername] = useState(user?user.username:'')
    const [editMode, startEdit] = useState(false)
    const [successAnimation, setConnection] = useState(0)
    const [image, setImage] = useState(null)
    const [imageCurrentUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if(editMode){
            setConnection(1)
        }
    }, [username])

    useEffect(() => {
        if(successAnimation===1){
            startEdit(true)
        }
    }, [successAnimation])

    useEffect(() => {
        if(image){
            setConnection(1)
            const file = image
            setImageUrl(URL.createObjectURL(file))
        }
    }, [image])

    async function saveUserChanges(){
        setConnection(2)
        let avatar_url = user.avatar_url
        if(image){
            const {data, error} = await supabase.storage
                .from('avatars')
                .upload(`${Date.now()}_${image.name}`, image)
            if(error){
                console.log(error)
            }
            if(data){
                avatar_url = data.Key
                if(user.avatar_url){
                    const oba = await supabase.storage
                    .from('avatars')
                    .remove([user.avatar_url.split('/')[1]])
                }
            }
        }
                
        const eba = await supabase
            .from('profiles')
            .update({'username':username, 'avatar_url':avatar_url})
            .match({'email':user.email})
            .then(() => {
                setConnection(0)
                reqlog(Math.random())
            })
    }

    async function logout() {
        const eba = await supabase.auth.signOut()
        .then(() => {
            Router.reload()
        })
    }
    
    return (
        <div>
            <SecondTitle titlecontent='Perfil'/>
            <div className="secondtext userdata">
                <label htmlFor="formId" onChange={e => setImage(e.target.files[0])} className='profilepicwrapper'>
                    <input id="formId" type='file' accept='image/*' className="displaynone"/>
                    {!imageCurrentUrl?profileUser.avatar_url?<div className="imgpicture" style={{backgroundImage:`url(https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${user.avatar_url})`}}></div>:<div className="imgpicture" style={{backgroundImage:"url(https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/avatars/user_placeholder.png)"}}/>:<div className="imgpicture" style={{backgroundImage:`url(${imageCurrentUrl})`}}/>}
                    <div className="loginpicturewrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="loginpicturesvg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </label>
                <input className='displaynone' type='file' accept='image/jpeg image/png'/>
                <div>Email:&nbsp;<div>{email}</div></div>
                <div>Usuário:&nbsp;{editMode?<input autoFocus value={username} placeholder={'Usuário...'} onInput={e => setUsername(e.target.value)}></input>:<div>{username}</div>}</div>
            </div>
            <div className="justifycenter">
                <div className="editprofilebuttons">
                <button onClick={() => startEdit(!editMode)} className='useredit'>
                <svg xmlns="http://www.w3.org/2000/svg" className={editMode?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="#ffffff">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={!editMode?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="#ffffff">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                </button>
                <button onClick={saveUserChanges} className={editMode?'useredit':'displaynone'}>Salvar</button>
                </div>
                <InfoBox successAnimation={successAnimation}/>
                <div className="profiledark">
                    <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode}/>
                </div>
                <button className="loginbutton logintext" onClick={logout}>Logout
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                </button>
            </div>
        </div>
    )
}

export default Profile;