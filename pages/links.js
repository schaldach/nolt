import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import NecessaryDataLink from "../components/NecessaryData";
import SmallerAnotation from "../components/LinkAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"
import AddButton from "../components/AddButton"

function Links({user, propLinks, addLink, propGroups}) {
    const [successAnimation, conectionMade] = useState(0)
    const [needData,requestD] = useState(false)
    const [changed, setChange] = useState(false)
    const allLinks = propLinks?propLinks:[]
    const allGroups = propGroups

    useInterval(() => {syncLinks(allLinks, true)},2000)

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
                    data.sort((a,b) => {return a.id-b.id})
                    addLink(data)
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
        conectionMade(2)
        let newGroups = [...allGroups]
        let groupChanges = false
        newGroups.forEach(group => {
            const indexFound = group['links'].indexOf(linkId)
            if(indexFound!==-1){
                groupChanges = true
                group['links'].splice(indexFound, 1)
            }
        })
        if(groupChanges){
            const eba = await supabase
                .from('grupos')
                .upsert(newGroups)
        }
        let newLinks = allLinks.filter(links => links.id!==linkId)
        const eba = await supabase
            .from('links')
            .delete()
            .match({ id: linkId })
            .then( () => {
                conectionMade(0)
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
                <AddButton addAnotation={() => requestD(true)}/>
                {allLinks.map(link =>
                <SmallerAnotation onDelete={onDelete} key={link.id} id={link.id} link={link} 
                linkname={link.name} linkcontent={link.href} onFavorite={onFavorite} favorite={link.favorite}></SmallerAnotation>
                )}
                <NecessaryDataLink requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
            </div>
        </div>
    )
}

export default Links;