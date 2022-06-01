import React from "react"

function NecessaryData({visualclass}) {
    return (
        <div className={visualclass+' necessarydata'}>
            <div>Opa amigo!</div>
            <div>
                <button className='confirmbuttons'>Salvar</button>
                <button className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryData