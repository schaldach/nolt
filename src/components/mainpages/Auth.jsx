import React from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth({reqlog}) {
    async function login() {
        const { user } = supabase.auth.signIn({provider: 'google'})
        reqlog(true)
    }

    return (
        <div className="login">
            <div className="loginbox">
                <div className="titulo">Nolt</div>
                <div className="logintext">Login</div>
                <button className="loginbutton logintext" onClick={login}>
                <div className="google"></div></button>
            </div>
        </div>
    )
}

export default Auth;