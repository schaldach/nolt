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
        let newLinks = [...allLinks]
        newLinks.push({
            ref: href,
            name: ''
        })
    }

    function requestData(){
        let classes = needData?'':'displaynone'
        return classes
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button onClick={addAnotation}>+</button>
            <NecessaryData onFinish={finishAnotation} visualclass={requestData()}/>
            {allLinks.map(link =>
            <SmallerAnotation linkname={link.name} linkcontent={link.ref}></SmallerAnotation>
            )}
        </div>
    )
}

export default Links;