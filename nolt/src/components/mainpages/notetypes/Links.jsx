import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote}) {
    const[allLinks,addLink] = useState([])
    const[needData,requestD] = useState(false)

    function addAnotation(){
        requestD(true)
    }

    function finishAnotation(href){
        requestD(false)
    }

    function requestData(){
        let classes = needData?'':'displaynone'
        return classes
    }

    return (
        <div className={visualnote}>
            <button onClick={addAnotation}>+</button>
            <NecessaryData visualclass={requestData()}/>
            {allLinks.map(link =>
            <SmallerAnotation linkcontent={link.ref}></SmallerAnotation>
            )}
        </div>
    )
}

export default Links;