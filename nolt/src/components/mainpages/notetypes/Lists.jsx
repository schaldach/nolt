import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import Anotation from "./smallercomponents/Anotation"

function Lists({visualnote, onNoteAdded}) {
    const[allLists,addList] = useState([])
    const[needData,requestD] = useState(false)

    function addAnotation(number){

    }

    function requestData(){

    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={addAnotation}>+</button>
            <NecessaryData/>
        </div>
    )
}

export default Lists;