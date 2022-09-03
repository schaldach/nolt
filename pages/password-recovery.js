import {supabase} from "../utils/supabaseClient"
import Router from "next/router";
import React, { useEffect, useState } from "react";
import LoginBackground from "../components/LoginBackground";

function PasswordRecovery() {
    const [newpassword, alterpassword] = useState('')
    const [newpassword2, alterpassword2] = useState('')
    const [errorMsg, throwError] = useState(false)

    useEffect(() => {
        throwError(false)
    }, [newpassword, newpassword2])

    async function finalChange(){
        if(newpassword!==newpassword2){throwError(true);return}
        const {error} = supabase.auth.update({ password: newpassword })
        if(error){throwError(true);return}
        const eba = await supabase.auth.signOut()
        .then(() => {
            Router.push('/auth')
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
                <div className="divinput"><input type='text' onInput={e => alterpassword2(e.target.value)} value={newpassword2} placeholder='Confirmar senha'></input></div>
                <button className="loginbutton logintext" onClick={() => finalChange()}>Alterar senha</button>
                {errorMsg?<div className="loginerror logintext"><div>A senha não é válida ou elas não coincidem<br/>&#40;A senha precisa ter no mínimo 6 caracteres&#41;</div></div>:''}
            </div>
        </div>
    )
}

export default PasswordRecovery;