import React from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth({performAuth}) {
    async function login() {
        const { user, session, error } = await supabase.auth.signIn({
          provider: 'google',
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