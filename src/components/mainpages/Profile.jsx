import React from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import { supabase } from "./notetypes/SupaBaseClient"

function Profile({visualclass, performAuth}) {
    async function logout() {
        const { error } = await supabase.auth.signOut()
        performAuth(false)
    }
    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Perfil'/>
            <div className="secondtext">Alterar informações sobre o perfil</div>
            <button className="logoutbutton" onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile;