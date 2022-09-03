import {supabase} from "../utils/supabaseClient"
import {useRouter} from "next/router";
import React, { useState } from "react";

function PasswordRecovery({setpassword}) {
    const [newpassword, alterpassword] = useState('')
    const router = useRouter();
    const accessToken = typeof window !== 'undefined'?router.query.access_token:''

    async function finalChange(){
        supabase.auth.api.updateUser(accessToken, { newpassword })
        .then(() => {
            setpassword(false)
            router.push("/")
            .then(() => {
                router.reload()
            })
        })
        .catch(() => {
            notify.error("token-expirou");
        });
    }

    return (
        <div>
            <div className="passwordrecover">
                <input value={newpassword} placeholder='Nova senha' onChange={e => alterpassword(e.target.value)}></input>
                <button onClick={() => finalChange()}>Alterar senha</button>
            </div>
        </div>
    )
}

export default PasswordRecovery;