import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import Anotation from "./smallercomponents/Anotation"

function Lists({visualnote}) {
    const[allLists,addList] = useState([])
    const[needData,requestD] = useState(false)

    function addAnotation(number){

    }

    function requestData(){

    }

    return (
        <div className={visualnote}>
            <button>+</button>
            <NecessaryData/>
        </div>
    )
}

export default Lists;