import React, { useState } from "react"

function NecessaryData({visualclass, onFinish, requestD}) {
    const [size, changeSize] = useState(1)

    return (
        <div className={visualclass+' anot'}>
            <div className='requestingdata'>Insira o número de itens da sua lista:</div>
            <input type='number' 
            onInput={e => changeSize(e.target.value)} placeholder='Tamanho'/>
            <div className='bothbuttons'>
                <button onClick={() => onFinish(size)} className='confirmbuttons'>Salvar</button>
                <button onClick={() => requestD(false)} className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryData