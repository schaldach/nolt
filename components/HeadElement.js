import Head from "next/head"
import React, {useEffect} from 'react'

function HeadElement ({darkMode, standard}) {
    useEffect(() => {
        if(darkMode){
            document.querySelector("body").classList.add('darkBody')
            document.querySelector("body").classList.remove('lightBody')
        }
        else{
            document.querySelector("body").classList.add('lightBody')
            document.querySelector("body").classList.remove('darkBody')
        }
        if(standard){
            document.querySelector("body").classList.remove('lightBody')
            document.querySelector("body").classList.remove('darkBody')
        }
    })

    return (
    <Head>
        <title>Nolt</title>
    </Head>
    )
}

export default HeadElement