import React, { useState } from "react"

function NecessaryDataLink({visualclass, onFinish, requestD}) {
    const [linkName, changeLinkName] = useState('')
    const [linkContent, changeLinkContent] = useState('')

    return (
        <div className={visualclass+' littlelink requestdata'}>
            <input type='text'
            onInput={e => changeLinkName(e.target.value)} placeholder='Nome do Link'/>
            <input type='text' 
            onInput={e => changeLinkContent(e.target.value)} placeholder='Link (URL)'/>
            <div className='bothbuttons'>
                <button onClick={() => onFinish(linkName, linkContent)} className='confirmbuttons'>Salvar</button>
                <button onClick={() => requestD(false)} className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryDataLink