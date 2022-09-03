import {supabase} from "../utils/supabaseClient"
import Router from "next/router";
import React, { useState } from "react";

function PasswordRecovery() {
    const [newpassword, alterpassword] = useState('')
    const accessToken = Router.query.access_token;

    async function finalChange(){
        supabase.auth.api.updateUser(accessToken, { newpassword })
            .then(() => {
                Router.push("/auth");
            })
            .catch(() => {
                notify.error("token-expirou");
            });
    }

    return (
        <div>
            <div className="passwordrecover">
                <input value={newpassword} placeholder='Nova senha' onChange={e => alterpassword(e.target.value)}></input>
                <button onClick={finalChange}>Alterar senha</button>
            </div>
        </div>
    )
}

export default PasswordRecovery;