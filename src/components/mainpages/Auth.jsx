import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth({performAuth}) {
    const [login, changeMode] = useState(true)
    const [error, throwError] = useState(false)
    const [currentEmail, updateEmail] = useState('')
    const [currentPassword, updatePassword] = useState('')

    useEffect(() => {
        throwError(false)
    }, [login])

    async function signin() {
        const { user } = supabase.auth.signIn({
            email: currentEmail,
            password: currentPassword,
        })
        .then(() => {
            if(user){performAuth(true)}
            else{throwError(true)}
        })
    }

    async function signup() {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', currentEmail)
        if(!data){
            const { user } = supabase.auth.signUp({
                email: currentEmail,
                password: currentPassword,
            })
            if(user){performAuth(true)}
        }
        else{throwError(true)}
    }

    function errortext(){
        let text = ''
        if(error){
            if(login){text = 'Esta conta não existe.'}
            else{text = 'Esta conta já existe.'}
        }
        else{text = ''}
        return text
    }

    return (
        <div className="login">
            <div className="loginbox">
                <div className="titulo">nolt</div>
                <div className="logintext">{login?'Login':'Cadastro'}</div>
                <input onInput={e => updateEmail(e.target.value)} value={currentEmail} placeholder='Email'></input>
                <input onInput={e => updatePassword(e.target.value)} value={currentPassword} placeholder='Senha'></input>
                <button className={login?"loginbutton logintext":'displaynone'} onClick={signin}>Fazer Login</button>
                <button className={login?'displaynone':"loginbutton logintext"} onClick={signup}>Fazer Cadastro</button>
                <div className="loginerror logintext">{errortext()}</div>
                <button className="loginchange" onClick={() => changeMode(!login)}>{login?'Ainda não tenho uma conta':'Já tenho uma conta'}</button>
            </div>
        </div>
    )
}

export default Auth;