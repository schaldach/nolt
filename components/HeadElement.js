import Head from "next/head"
import React, {useEffect} from 'react'

function HeadElement ({darkMode}) {
    useEffect(() => {
        if(darkMode){document.querySelector("body").classList.add('darkBody')}
        else{document.querySelector("body").classList.remove('darkBody')}
    })

    return (
    <Head>
        <title>Nolt</title>
    </Head>
    )
}

export default HeadElement