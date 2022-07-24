import React, { useEffect } from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import { supabase } from "../../utils/supabaseClient"
import { useState } from "react"

function Profile({visualclass, performAuth, user, requpd}) {
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [editMode, startEdit] = useState(false)
    const [connectionStatus, setConnection] = useState(0)

    useEffect(() => {
        getProfile()
        setTimeout(() => setConnection(0), 500)
    }, [user])

    useEffect(() => {
        setConnection(1)
    }, [username, bio, email])

    function getProfile(){
        if(!user){return}
        setUsername(user.username)
        setBio(user.bio)
        setEmail(user.email)
    }

    async function saveUserChanges(){
        setConnection(2)
        const eba = await supabase
            .from('profiles')
            .update({'username':username, 'bio':bio})
            .match({'email':user.email})
            .then(() => {
                setConnection(0)
                requpd(Math.random())
            })
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()
        performAuth(false)
    }
    
    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Perfil'/>
            <div className="secondtext userdata">
                <div>Email: {email}</div>
                <div>Usuário: {editMode?<input autoFocus value={username} placeholder={'Usuário...'} onInput={e => setUsername(e.target.value)}></input>:username}</div>
                <div>{editMode?<input value={bio} placeholder={'Biografia...'} onInput={e => setBio(e.target.value)}></input>:bio}</div>
            </div>
            <div className="justifycenter">
                <div className="editprofilebuttons">
                <button onClick={() => startEdit(!editMode)} className='useredit'>
                <svg xmlns="http://www.w3.org/2000/svg" className={!editMode?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="#ffffff">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={editMode?'dropdownsvg':'displaynone'} viewBox="0 0 20 20" fill="#ffffff">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                </button>
                <button onClick={saveUserChanges} className={editMode?'useredit':'displaynone'}>Salvar</button>
                <div className={connectionStatus===0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={connectionStatus===1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={connectionStatus===2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizando...
                    </div>
                </div>
                <button className="loginbutton logintext" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile;