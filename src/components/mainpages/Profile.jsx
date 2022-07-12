import React, { useEffect } from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import { supabase } from "./notetypes/SupaBaseClient"
import { useState } from "react"

function Profile({visualclass, performAuth, user}) {
    const [username, setUsername] = useState(null)
    const [bio, setBio] = useState(null)
    const [email, setEmail] = useState(null)

    useEffect(() => {
        getProfile()
    }, [user])

    async function getProfile(){
        if(!user){return}
        setUsername(user.username)
        setBio(user.bio)
        setEmail(user.email)
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()
        performAuth(false)
    }
    
    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Perfil'/>
            <div className="secondtext">
                <div>Usuário: {username}</div>
                <div>Email: {email}</div>
                <div>{bio}</div>
            </div>
            <div className="justifycenter"><button className="loginbutton logintext" onClick={logout}>Logout</button></div>
        </div>
    )
}

export default Profile;