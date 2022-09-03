import {supabase} from "../utils/supabaseClient"
import Router from "next/router";
import React, { useEffect, useState } from "react";

function PasswordRecovery({user}) {
    const [newpassword, alterpassword] = useState('')
    const [accessToken, setToken] = useState(null)

    useEffect(() => {
        setToken(Router.query.access_token)
    }, [])

    async function finalChange(){
        if(user){const eba = await supabase.auth.signOut()}
        supabase.auth.api.updateUser(accessToken, { newpassword })
    }

    return (
        <div>
            <div className="passwordrecover">
                <input value={newpassword} placeholder='Nova senha' onChange={e => alterpassword(e.target.value)}></input>
                <button onClick={() => finalChange()}>Alterar senha</button>
            </div>
        </div>
    )
}

export default PasswordRecovery;