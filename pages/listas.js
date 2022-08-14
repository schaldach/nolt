import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import ListAnotation from "../components/ListAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Lists({user}) {
    const [allLists, addList] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncLists(allLists, true)},2500)
    
    useEffect(() => {
        syncLists(allLists)
    }, [user])

    async function syncLists(lists, auto){
        if(!user||!changed&&auto){return}
        conectionMade(2)
        const bla = await supabase
            .from('listas')
            .upsert(lists)
            .then( async () => {
                if(!auto){
                    const { data } = await supabase
                        .from('listas')
                        .select('*')
                        .eq('userid', user.id)
                    data.sort((a,b) => {return a.id-b.id})
                    addList(data)
                }
                conectionMade(0)
                setChange(false)
            })
    }

    async function addAnotation(){
        conectionMade(2)
        setChange(true)
        let newList = {title: '', content: [{text: '1. ', id: 0, complete:false}], userid:user.id, favorite:false}
        const bla = await supabase
            .from('listas')
            .insert([newList])
            .then(() => syncLists(allLists))
    }

    function onEdit(title,content,list){
        setChange(true)
        const index = allLists.indexOf(list)
        let newLists = [...allLists]
        newLists[index].content = content
        newLists[index].title = title
        addList(newLists)
        conectionMade(1)
    }

    function onFavorite(list){
        setChange(true)
        let newLists = [...allLists]
        const index = newLists.indexOf(list)
        newLists[index].favorite = !newLists[index].favorite
        addList(newLists)
        conectionMade(1)
    }

    async function onDelete(listId){
        let lastconection = successAnimation
        conectionMade(2)
        let newLists = allLists.filter(lists => lists.id!==listId)
        const eba = await supabase
            .from('listas')
            .delete()
            .match({ id: listId })
            .then( () => {
                conectionMade(lastconection)
            })
        addList(newLists)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Listas'/>
            <InfoBox successAnimation={successAnimation}/>
            </div>
            <div className='displayanotations'>
                <button className='addanotation' onClick={addAnotation}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="connectionsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allLists.map(list =>
                    <ListAnotation onFavorite={onFavorite} favorite={list.favorite} list={list} onDelete={onDelete} onEdit={onEdit}
                    key={list.id} title={list.title} content={list.content}/>
                )}
            </div>
        </div>
    )
}

export default Lists;