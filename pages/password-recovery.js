import {supabase} from "../utils/supabaseClient"
import Router from "next/router";
import React, { useEffect, useState } from "react";

function PasswordRecovery() {
    const [newpassword, alterpassword] = useState('')
    const [passwordRequest, reqPas] = useState(false)
    const accessToken = Router.query.access_token;

    useEffect(() => {
        async function finalChange(){
            if(passwordRequest){
                supabase.auth.api.updateUser(accessToken, { newpassword })
                .then(() => {
                    Router.push("/auth");
                })
                .catch(() => {
                    notify.error("token-expirou");
                });
            }
        }
        finalChange()
    }, [passwordRequest])

    return (
        <div>
            <div className="passwordrecover">
                <input value={newpassword} placeholder='Nova senha' onChange={e => alterpassword(e.target.value)}></input>
                <button onClick={() => reqPas(true)}>Alterar senha</button>
            </div>
        </div>
    )
}

export default PasswordRecovery;