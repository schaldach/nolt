import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import NecessaryDataLink from "../components/NecessaryData";
import SmallerAnotation from "../components/LinkAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Links({user}) {
    const [allLinks,addLink] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [needData,requestD] = useState(false)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncLinks(allLinks, true)},3000)

    useEffect(() => {
        syncLinks(allLinks)
    }, [user])

    async function syncLinks(links, auto){
        if(!user||!changed&&auto){return}
        conectionMade(2)
        const bla = await supabase
            .from('links')
            .upsert(links)
            .then( async () => {
                if(!auto){
                    const { data } = await supabase
                        .from('links')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return a.id-b.id})
                    addLink(formattedData)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    async function finishAnotation(name, href){
        conectionMade(2)
        setChange(true)
        requestD(false)
        let newLink = {href: href, name: name, favorite:false, userid:user.id}
        const bla = await supabase
            .from('links')
            .insert([newLink])
            .then(() => syncLinks(allLinks))
    }

    async function onDelete(linkId){
        let lastconection = successAnimation
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

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Links'/>
            <InfoBox successAnimation={successAnimation}/>
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