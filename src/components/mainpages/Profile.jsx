import React, { useEffect } from "react"
import SecondTitle from "./smallcomponents/SecondTitle"
import { supabase } from "./notetypes/SupaBaseClient"
import { useState } from "react"

function Profile({visualclass, performAuth, logged}) {
    const [username, setUsername] = useState(null)

    useEffect(() => {
        getProfile()
    }, [logged])

    async function getProfile(){
        const user = supabase.auth.user()
        if(!user||!logged){return}
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        setUsername(data.id)
    }

    async function logout() {
        const { error } = await supabase.auth.signOut()
        performAuth(false)
    }
    
    return (
        <div className={visualclass}>
            <SecondTitle titlecontent='Perfil'/>
            <div className="secondtext">Alterar informações sobre o perfil</div>
            <div>
                <div>{'Nome: '+username}</div>
                <input placeholder="Novo nome"></input><button>Atualizar</button>
            </div>
            <button className="logoutbutton" onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile;