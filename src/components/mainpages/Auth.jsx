import React from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth() {
    async function login() {
        const { user } = await supabase.auth.signIn({provider: 'google'})
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