import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import NecessaryDataLink from "./smallercomponents/NecessaryDataLink";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLinks,addLink] = useState([])
    const[needData,requestD] = useState(false)
    const[latestId, addId] = useState(0)

    useEffect(() => {
        fetchLinks()
    }, [])

    async function fetchLinks(){
        
    }

    function finishAnotation(name, href){
        requestD(false)
        let newLinks = [...allLinks]
        newLinks.push({
            href: href,
            name: name,
            id: latestId
        })
        addId(latestId+1)
        addLink(newLinks)
        onNoteAdded()
    }

    function onDelete(linkId){
        let newLinks = allLinks.filter(links => links.id!==linkId)
        onNoteRemoved()
        addLink(newLinks)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='linkbutton' onClick={() => requestD(true)}>+</button>
            {allLinks.map(link =>
            <SmallerAnotation onDelete={onDelete} key={link.id} id={link.id} linkname={link.name} linkcontent={link.href}></SmallerAnotation>
            )}
            <NecessaryDataLink size='link' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
        </div>
    )
}

export default Links;