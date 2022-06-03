import React, { useState } from "react"

function NecessaryData({visualclass, onFinish, requestD}) {
    const [size, changeSize] = useState(1)

    return (
        <div className={visualclass}>
            <div>Opa amigo!</div>
            <input className={''} type='number' 
            onInput={e => changeSize(e.target.value)} placeholder='Tamanho'/>
            <div>
                <button onClick={() => onFinish(size)} className='confirmbuttons'>Salvar</button>
                <button onClick={() => requestD(false)} className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryData