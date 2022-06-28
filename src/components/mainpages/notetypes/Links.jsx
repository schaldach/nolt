import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import NecessaryDataLink from "./smallercomponents/NecessaryDataLink";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLinks,addLink] = useState([])
    const[needData,requestD] = useState(false)
    const[latestId, addId] = useState(1)

    useEffect(() => {
        fetchLinks()
    }, [])

    async function fetchLinks(){
        const { data, count } = await supabase
            .from('links')
            .select('*', { count: 'exact' })
        console.log(count)
        onNoteAdded('links', count)
        addId(1+data[data.length-1].id)
        addLink(data)
    }

    async function finishAnotation(name, href){
        requestD(false)
        let newLink = {href: href, name: name, id: latestId}
        const { data } = await supabase
            .from('links')
            .insert([newLink])
            .single()
        addId(latestId+1)
        addLink([...allLinks, newLink])
        onNoteAdded('links', 1)
    }

    async function onDelete(linkId){
        let newLinks = allLinks.filter(links => links.id!==linkId)
        const { data } = await supabase
            .from('links')
            .delete()
            .match({id:linkId})
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