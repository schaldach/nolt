import Link from 'next/link'
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"
import LoginBackground from '../components/LoginBackground';

function Auth({throwError, reqlog, errorMessage, setProject}) {
    const [login, changeMode] = useState(true)
    const [currentEmail, updateEmail] = useState('')
    const [currentPassword, updatePassword] = useState('')
    const [passwordVisible, setVisible] = useState(false)

    useEffect(() => throwError(false), [currentEmail, currentPassword, login])

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
            password: currentPassword,
            email: currentEmail,
        })
        .then(() => {
            reqlog(Math.random())
        })
    }

    function errortext(){
        let text
        if(errorMessage&&(currentEmail||currentPassword)){
            if(login){text = 'Usuário e/ou senha inválidos.'}
            else{text = 'Os dados não são válidos.'}
        }
        else{text = ''}
        return text
    }

    return (
        <div className="login">
            <div className="loginbox">
                <div className='titulo'>
                <div>nolt</div>
                <Link href='/'><div onClick={() => setProject(true)} className="loginlink">Ir à Página inicial</div></Link>
                </div>
                <div className="logintext">{login?'Login':'Cadastro'}</div>
                <form>
                <div className="divinput"><input autoComplete='current-password' type='text' onInput={e => updateEmail(e.target.value)} value={currentEmail} placeholder='Email'></input></div>
                <div className="divinput minorpadding">
                    <input autoComplete='current-password' type={passwordVisible?'text':'password'} onInput={e => updatePassword(e.target.value)} value={currentPassword} placeholder='Senha'></input>
                    <button onClick={() => setVisible(!passwordVisible)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='loginsvg2' viewBox="0 0 20 20" fill={passwordVisible?'var(--color4)':'#000000'}>
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                </form>
                <button className={login?"loginbutton logintext":'displaynone'} onClick={signin}>Login
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                </button>
                <button className={login?'displaynone':"loginbutton logintext"} onClick={signup}>Cadastro
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                </button>
                <div className="loginerror logintext">{errortext()}</div>
                <div className="loginchangewrapper">{login?'Não possui uma conta?':'Já tem uma conta?'}
                    <button className="loginchange" onClick={() => changeMode(!login)}>{login?'Cadastro':'Login'}</button>                
                </div>
            </div>
            <div className='loginbackground'>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
            </div>
        </div>
    )
}

export default Auth;