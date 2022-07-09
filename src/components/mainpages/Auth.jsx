import React from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth() {
    async function login() {
        const { user } = await supabase.auth.signIn({provider: 'google'})
        .then( async () => {
        const eba = await supabase
            .from('profiles')
            .upsert({username:'', id:user.id, bio:''})
        })
    }
    return (
        <div className="login">
            <div className="loginbox">
                <div className="titulo">Nolt</div>
                <div className="logintext">Login</div>
                <button className="loginbutton logintext" onClick={login}>Fazer login com Google</button>
                <div></div>
            </div>
        </div>
    )
}

export default Auth;