import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth({reqlog, errorMessage, throwError}) {
    const [login, changeMode] = useState(true)
    const [currentEmail, updateEmail] = useState('')
    const [currentPassword, updatePassword] = useState('')

    useEffect(() => {throwError(false)}, [currentEmail, currentPassword, login])

    async function signin() {
        const { error } = supabase.auth.signIn({
            email: currentEmail,
            password: currentPassword,
        })
        .then(() => {
            reqlog(Math.random())
        })
    }

    async function signup() {
        const { error } = supabase.auth.signUp({
            email: currentEmail,
            password: currentPassword,
        })
        .then(() => {
            reqlog(Math.random())
        })
    }

    function errortext(){
        let text
        if(errorMessage){
            if(login){text = 'Usuário e/ou senha inválidos.'}
            else{text = 'Os dados não são válidos.'}
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
                <div className="loginchangewrapper">{login?'Não possui uma conta?':'Já tem uma conta?'}
                    <button className="loginchange" onClick={() => changeMode(!login)}>{login?'Cadastro':'Login'}</button>                
                </div>
            </div>
        </div>
    )
}

export default Auth;