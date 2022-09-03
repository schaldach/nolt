import {supabase} from "../utils/supabaseClient"
import {useRouter} from "next/router";
import React, { useState } from "react";

function PasswordRecovery({setpassword}) {
    const [newpassword, alterpassword] = useState('')
    const router = useRouter();
    const accessToken = typeof window !== 'undefined'?router.query.access_token:''

    async function finalChange(){
        const eba = await supabase.auth.signOut()
        .then(() => {
            supabase.auth.updateUser(accessToken, { newpassword })
            router.push("/")
            .then(() => {
                router.reload()
            })
        })
        .catch((error) => {
            console.log(error)
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