import React from "react"

function NecessaryData({visualclass, onFinish, requestD, size}) {
    function manageSize(){
        let classes = visualclass
        classes += size=='link'?'':' necessarydata'
        return classes
    }

    return (
        <div className={manageSize()}>
            <div>Opa amigo!</div>
            <div>
                <button className='confirmbuttons'>Salvar</button>
                <button className='confirmbuttons'>Cancelar</button>
            </div>
        </div>
    )
}

export default NecessaryData