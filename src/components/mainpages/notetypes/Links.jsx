import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import NecessaryDataLink from "./smallercomponents/NecessaryDataLink";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote, onNoteAdded, onNoteRemoved}) {
    const [animation, startAnimation] = useState(false)
    const[allLinks,addLink] = useState([])
    const[needData,requestD] = useState(false)

    useEffect(() => {
        fetchLinks()
    }, [])

    async function fetchLinks(){
        const { data, count } = await supabase
            .from('links')
            .select('*', { count: 'exact' })
        console.log(count)
        onNoteAdded('links', count)
        addLink(data)
    }

    async function saveLinks(){
        const { data } = await supabase
            .from('links')
            .upsert(allLinks)
    }

    function finishAnotation(name, href){
        requestD(false)
        let newLink = {href: href, name: name, id: Math.floor(Math.random()*1000000000)}
        addLink([...allLinks, newLink])
        onNoteAdded('links', 1)
    }

    function onDelete(linkId){
        let newLinks = allLinks.filter(links => links.id!==linkId)
        onNoteRemoved()
        addLink(newLinks)
    }

    function pulseAnimation() {
        saveLinks()
        startAnimation(true)
    }

    return (
        <div className={visualnote}>
            <div className={animation?'panimation wrapdiv':'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                <button className='savebutton'onClick={pulseAnimation}>Salvar Links</button>
            </div>
            <div className='displayanotations'>
                <button className='linkbutton' onClick={() => requestD(true)}>+</button>
                {allLinks.map(link =>
                <SmallerAnotation onDelete={onDelete} key={link.id} id={link.id} linkname={link.name} linkcontent={link.href}></SmallerAnotation>
                )}
                <NecessaryDataLink size='link' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
            </div>
        </div>
    )
}

export default Links;