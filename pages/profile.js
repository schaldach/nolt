import React, { useEffect } from "react"
import SecondTitle from "../components/SecondTitle"
import { supabase } from "../utils/supabaseClient"
import { useState } from "react"
import Router from 'next/router'
import DarkModeButton from "../components/DarkModeButton"

function Profile({user, reqlog, darkMode, setDarkMode}) {
    const profileUser = user?user:''
    const email = user?user.email:''
    const [username, setUsername] = useState(user?user.username:'')
    const [image, setImage] = useState(null)
    const [imageCurrentUrl, setImageUrl] = useState(null)
    const [successMessage, throwSuccess] = useState(false)

    useEffect(() => {
        if(image){
            setImageUrl(URL.createObjectURL(image))
        }
    }, [image])

    async function saveUserChanges(){
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
                reqlog(Math.random())
            })
    }

    function alterPassword(){
        supabase.auth.api
            .resetPasswordForEmail(user.email, {
            redirectTo: `${window.location.origin}/password-recovery`,
        })
        .then(() => {
            throwSuccess(true)
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
            <div className="userdata">
                <label htmlFor="formId" onChange={e => setImage(e.target.files[0])} className='profilepicwrapper'>
                    <input id="formId" type='file' accept='image/*' className="displaynone"/>
                    {!imageCurrentUrl?profileUser.avatar_url?<img className="imgpicture" src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/${user.avatar_url}`}></img>:<img className="imgpicture" src={`https://uvvzrlvaqkcqmzdblein.supabase.co/storage/v1/object/public/avatars/user_placeholder.png`}></img>:<img className="imgpicture" src={`${imageCurrentUrl}`}></img>}
                    <div className="loginpicturewrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" className="loginpicturesvg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </label>
                <div className="bothdata secondtext">
                    <div><div className="smalltextlogin"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdownsvg"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>Email:&nbsp;</div><div>{email}</div></div>
                    <div><div className="smalltextlogin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>Usuário:&nbsp;</div><input value={username} placeholder={'Usuário...'} onInput={e => setUsername(e.target.value)}></input></div>
                </div>
            </div>
            <div className="justifycenter">
                <div>
                <button onClick={saveUserChanges} className='loginbutton logintext'>Salvar perfil</button>
                <div className="profiledark">
                    <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode}/>
                </div>
                </div>
                <button onClick={alterPassword} className='loginbutton logintext'>Alterar senha</button>
                <button className="loginbutton logintext" onClick={logout}>Logout
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                </button>
            </div>
            <div className="errorwrapper">
                {successMessage?<div className="loginsuccess logintext"><div>O token de recuperação foi enviado para o email acima com sucesso.</div></div>:''}
            </div>
        </div>
    )
}

export default Profile;