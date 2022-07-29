import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import NecessaryDataLink from "../components/NecessaryData";
import SmallerAnotation from "../components/LinkAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Links({user, reqsync}) {
    const [animation, startAnimation] = useState(false)
    const [allLinks,addLink] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)
    const [needData,requestD] = useState(false)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncLinks(allLinks)},10000)

    useEffect(() => {
        syncLinks(allLinks)
    }, [user])

    async function syncLinks(links, click){
        if(!user||!clickable||(!changed&&!click)){return}
        setClick(false)
        conectionMade(2)
        let newLinks = []
        let oldLinks = []
        links.forEach(link => {
            if(link.isNew){
                newLinks.push({
                    href: link.href,
                    name: link.name,
                    favorite: link.favorite,
                    userid: user.id
                })
            }
            else{oldLinks.push(link)}
        })
        const bla = await supabase
            .from('links')
            .upsert(newLinks)
            .then( async () => {
                const eba = await supabase
                    .from('links')
                    .upsert(oldLinks)
            })
            .then( async () => {
                const { data } = await supabase
                    .from('links')
                    .select('*')
                    .eq('userid', user.id)
                let formattedData = data
                formattedData.sort((a,b) => {return a.id-b.id})
                addLink(formattedData)
                conectionMade(0)
                reqsync(Math.random())
                setClick(true)
                setChange(false)
            })
    }

    function finishAnotation(name, href){
        setChange(true)
        requestD(false)
        let newLink = {href: href, name: name, id: Math.floor(Math.random()*9999999999), isNew:true, favorite:false}
        addLink([...allLinks, newLink])
        conectionMade(1)
    }

    async function onDelete(linkId){
        let lastconection = sucessAnimation
        conectionMade(2)
        let newLinks = allLinks.filter(links => links.id!==linkId)
        const eba = await supabase
            .from('links')
            .delete()
            .match({ id: linkId })
            .then( () => {
                conectionMade(lastconection)
            })
        addLink(newLinks)
    }

    function onFavorite(link){
        setChange(true)
        let newLinks = [...allLinks]
        const index = newLinks.indexOf(link)
        newLinks[index].favorite = !newLinks[index].favorite
        addLink(newLinks)
        conectionMade(1)
    }

    function pulseAnimation() {
        syncLinks(allLinks, true)
        startAnimation(true)
    }

    return (
        <div>
            <SecondTitle titlecontent='Anotações' extra='/Links'/>
            <InfoBox/>
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
                <button className='linkbutton' onClick={() => requestD(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvglink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allLinks.map(link =>
                <SmallerAnotation onDelete={onDelete} key={link.id} id={link.id} link={link} 
                linkname={link.name} linkcontent={link.href} onFavorite={onFavorite} favorite={link.favorite}></SmallerAnotation>
                )}
                <NecessaryDataLink size='link' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
            </div>
        </div>
    )
}

export default Links;