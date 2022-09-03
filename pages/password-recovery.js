import {supabase} from "../utils/supabaseClient"
import Router from "next/router";
import React, { useState } from "react";
import LoginBackground from "../components/LoginBackground";

function PasswordRecovery() {
    const [newpassword, alterpassword] = useState('')

    async function finalChange(){
        supabase.auth.update({ password: newpassword })
        .then(async () => {
            const eba = await supabase.auth.signOut()
            .then(() => {
                Router.push('/auth')
                .then(() => {
                    Router.reload()
                })
            })
        })
    }

    return (
        <div className="login">
            <div className='loginbackground'>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
            </div>
            <div className="loginbox">
                <div className='titulo'>nolt</div>
                <div className="logintext">Alterar Senha</div>
                <div className="divinput"><input type='text' onInput={e => alterpassword(e.target.value)} value={newpassword} placeholder='Nova senha'></input></div>
                <button className="loginbutton logintext" onClick={() => finalChange()}>Alterar senha</button>
            </div>
        </div>
    )
}

export default PasswordRecovery;