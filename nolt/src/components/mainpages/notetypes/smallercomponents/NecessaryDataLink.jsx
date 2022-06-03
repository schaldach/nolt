import React from "react"

function NecessaryDataLink({visualclass, onFinish, requestD}) {

    return (
        <div className={visualclass}>
            <div>Opa amigo!</div>
            <div>
                <button className='confirmbuttons'>Salvar</button>
                <button className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryDataLink