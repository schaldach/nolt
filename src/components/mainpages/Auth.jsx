import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "./notetypes/SupaBaseClient"

function Auth({setUser, performAuth}) {
    const [login, changeMode] = useState(true)
    const [error, throwError] = useState(false)
    const [currentEmail, updateEmail] = useState('')
    const [currentPassword, updatePassword] = useState('')

    useEffect(() => {throwError(false)}, [login])
    useEffect(() => {throwError(true)}, [performAuth])
    useEffect(() => {throwError(false)}, [])

    async function signin() {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', currentEmail)
            .single()
        if(!data){
            throwError(true)
            return
        }
        if(data.email===currentEmail){
            const { error } = supabase.auth.signIn({
                email: currentEmail,
                password: currentPassword,
            })
            .then(() => {
                if(error){throwError(true)}
                else{setUser(Math.random())}
            })
        }
        else{throwError(true)}
    }

    async function signup() {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', currentEmail)
            .single()
        if(!data&&currentPassword&&currentEmail){
            const { error } = supabase.auth.signUp({
                email: currentEmail,
                password: currentPassword,
            })
            .then(() => {
                if(error){throwError(true)}
                else{setUser(Math.random())}
            })
        }
        else{throwError(true)}
    }

    function errortext(){
        let text = ''
        if(error){
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