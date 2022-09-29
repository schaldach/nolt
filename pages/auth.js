import Link from 'next/link'
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient"
import LoginBackground from '../components/LoginBackground';

function Auth({throwError, reqlog, errorMessage, setProject}) {
    const [login, changeMode] = useState(true)
    const [email, updateEmail] = useState('')
    const [repeatEmail, updateRepeatEmail] = useState('')
    const [password, updatePassword] = useState('')
    const [passwordVisible, setVisible] = useState(false)
    const [recoverPassword, setRecover] = useState(false)
    const [successMessage, throwSuccess] = useState(false)
    const [emailError, throwEmailError] = useState(false)

    useEffect(() => throwError(false), [email, password, login])
    useEffect(() => throwEmailError(false), [email, login])
    useEffect(() => throwSuccess(false), [login])

    async function signin() {
        const { error } = supabase.auth.signIn({email,password})
        .then(() => {
            reqlog(Math.random())
        })
        if(error){
            console.log(error)
        }
    }

    async function alterPassword(){
        throwEmailError(false);throwSuccess(false)
        const {error} = await supabase.auth.api
            .resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/password-recovery`,
        })
        if(error){throwEmailError(true)}
        else{throwSuccess(true)}
    }

    async function signup() {
        if(email!==repeatEmail){
            throwError(true)
            return
        }
        const { error } = supabase.auth.signUp({email,password})
        .then(() => {
            reqlog(Math.random())
        })
        if(error){
            console.log(error)
        }
    }

    return (
        <div className="login">
            <Link href='/'><div onClick={() => setProject(true)} className="loginlink"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>Voltar</div></Link>
            <div className="loginbox">
                <div className='titulo'>nolt</div>
                <form>
                <div className='divinputwrapper'>Email<div className="divinput"><input autoComplete='username' type='text' onInput={e => updateEmail(e.target.value)} value={email} placeholder='exemplo@gmail.com'></input></div></div>
                <div className={!login&&!recoverPassword?'divinputwrapper':'displaynone'}>Confirmar Email<div className='divinput'><input type='text' onInput={e => updateRepeatEmail(e.target.value)} value={repeatEmail} placeholder='exemplo@gmail.com' autoComplete='username'></input></div></div>
                {recoverPassword?'':<div className='divinputwrapper'>Senha<div className="divinput">
                    <input autoComplete='current-password' type={passwordVisible?'text':'password'} onInput={e => updatePassword(e.target.value)} value={password} placeholder='&#40;Ao menos 6 caracteres&#41;'></input>
                    <button type="button" onClick={() => setVisible(!passwordVisible)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={!passwordVisible?'loginsvg2':'displaynone'} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className={passwordVisible?'loginsvg2':'displaynone'} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div></div>}
                <button className={recoverPassword?"loginbutton logintext":'displaynone'} onClick={alterPassword}>Enviar email
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                </button>
                <button className={login&&!recoverPassword?"loginbutton logintext":'displaynone'} onClick={signin}>Login
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                </button>
                <button className={!login&&!recoverPassword?'loginbutton logintext':"displaynone"} onClick={signup}>Cadastro
                <svg xmlns="http://www.w3.org/2000/svg" className="loginsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                </button>
                </form>
                {errorMessage&&(email||password)?<div className="loginerror logintext">{login?<div>Usuário e/ou senha inválidos<br/>&#40;A senha precisa ter no mínimo 6 caracteres&#41;</div>:<div>Os dados não são válidos<br/>&#40;A senha precisa ter no mínimo 6 caracteres&#41;</div>}</div>:''}
                {successMessage?<div className="loginsuccess logintext"><div>O token de recuperação foi enviado para o email acima com sucesso.</div></div>:''}
                {emailError?<div className="loginerror logintext"><div>O email não é válido.</div></div>:''}
                <div className="loginchangewrapper">
                    <button className="loginchange" onClick={() => {setRecover(!recoverPassword);throwSuccess(false)}}>{recoverPassword?'Voltar':'Esqueceu a senha?'}</button>                
                </div>
                <div className={!recoverPassword?"loginchangewrapper":'displaynone'}>{login?'Não possui uma conta?':'Já tem uma conta?'}
                    <button className="loginchange" onClick={() => changeMode(!login)}>{login?'Cadastro':'Login'}</button>                
                </div>
            </div>
            <div className='loginbackground'>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
                <LoginBackground/>
            </div>
        </div>
    )
}

export default Auth;