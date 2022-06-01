import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote, onNoteAdded}) {
    const[allLinks,addLink] = useState([])
    const[needData,requestD] = useState(false)
    const[latestId, addId] = useState(0)

    function finishAnotation(href){
        requestD(false)
        let newLinks = [...allLinks]
        newLinks.push({
            ref: href,
            name: '',
            id: latestId
        })
        addId(latestId+1)
        addLink(newLinks)
        onNoteAdded()
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button onClick={() => requestD(true)}>+</button>
            {allLinks.map(link =>
            <SmallerAnotation key={link.id} linkname={link.name} linkcontent={link.ref}></SmallerAnotation>
            )}
            <NecessaryData size='link' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
        </div>
    )
}

export default Links;