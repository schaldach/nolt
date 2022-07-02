import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import NecessaryDataLink from "./smallercomponents/NecessaryDataLink";
import SmallerAnotation from "./smallercomponents/SmallerAnotation"

function Links({visualnote, onNoteAdded, onNoteRemoved}) {
    const [animation, startAnimation] = useState(false)
    const[allLinks,addLink] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)
    const[needData,requestD] = useState(false)

    useEffect(() => {
        syncLinks()
    }, [])

    async function syncLinks(){
        const { data, count } = await supabase
            .from('links')
            .select('*', { count: 'exact' })
        console.log(count)
        onNoteAdded('links', count, true)
        addLink(data)
    }

    function finishAnotation(name, href){
        requestD(false)
        let newLink = {href: href, name: name, id: Math.floor(Math.random()*9999999999), isNew:true}
        addLink([...allLinks, newLink])
        onNoteAdded('links', 1)
    }

    async function onDelete(linkId){
        conectionMade(2)
        let newLinks = allLinks.filter(links => links.id!==linkId)
        const eba = await supabase
            .from('links')
            .delete()
            .match({ id: linkId })
            .then( () => {
                conectionMade(0)
            })
        onNoteRemoved()
        addLink(newLinks)
    }

    function pulseAnimation() {
        syncLinks()
        startAnimation(true)
    }

    return (
        <div className={visualnote}>
            <div className='flex'>
                <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                    <button className='savebutton' onClick={pulseAnimation}>Salvar Links</button>
                </div>
                <div>
                    <div className={sucessAnimation==0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={sucessAnimation==1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={sucessAnimation==2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizando...
                    </div>
                </div>
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