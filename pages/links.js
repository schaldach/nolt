import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import NecessaryDataLink from "../components/NecessaryData";
import SmallerAnotation from "../components/LinkAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Links({user}) {
    const [animation, startAnimation] = useState(false)
    const [allLinks,addLink] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [needData,requestD] = useState(false)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncLinks(allLinks, false, true)},5000)

    useEffect(() => {
        syncLinks(allLinks)
    }, [user])

    async function syncLinks(links, click, auto){
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
                let anyNew = false
                links.forEach(link => {if(link.isNew){anyNew=true}})
                if(!auto||anyNew){
                    const { data } = await supabase
                        .from('links')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return a.id-b.id})
                    addLink(formattedData)
                }
                conectionMade(0)
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

    function pulseAnimation() {
        syncLinks(allLinks, true)
        startAnimation(true)
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