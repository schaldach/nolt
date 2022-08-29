import React, { useState } from "react"

function NecessaryDataLink({visualclass, onFinish, requestD}) {
    const [linkName, changeLinkName] = useState('')
    const [linkContent, changeLinkContent] = useState('')

    function wholeFinish(){
        changeLinkName('')
        changeLinkContent('')
        onFinish(linkName, linkContent)
    }

    return (
        <div className={visualclass+' littlelink requestdata'}>
            <input type='text' value={linkName} 
            onInput={e => changeLinkName(e.target.value)} placeholder='Nome do Link'/>
            <input type='text' value={linkContent} 
            onInput={e => changeLinkContent(e.target.value)} placeholder='Link (URL)'/>
            <div className='bothbuttons'>
                <button onClick={wholeFinish} className='confirmbuttons'>Salvar</button>
                <button onClick={() => requestD(false)} className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryDataLink