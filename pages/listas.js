import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import ListAnotation from "../components/ListAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"

function Lists({user}) {
    const [allLists, addList] = useState([])
    const [successAnimation, conectionMade] = useState(0)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)

    useInterval(() => {syncLists(allLists, false, true)},5000)
    
    useEffect(() => {
        syncLists(allLists)
    }, [user])

    async function syncLists(lists, click, auto){
        if(!user||!clickable||(!changed&&!click)){return}
        setClick(false)
        conectionMade(2)
        let oldLists = []
        let newLists = []
        lists.forEach(list => {
            if(list.isNew){
                newLists.push({
                    title: list.title,
                    content: list.content,
                    favorite: list.favorite,
                    userid: user.id
                })
            }
            else{oldLists.push(list)}
        })
        const bla = await supabase
            .from('listas')
            .upsert(oldLists)
            .then( async () => {
                const bla = await supabase
                    .from('listas')
                    .upsert(newLists)
            })
            .then( async () => {
                let anyNew = false
                lists.forEach(list => {if(list.isNew){anyNew=true}})
                if(!auto||anyNew){
                    const { data } = await supabase
                        .from('listas')
                        .select('*')
                        .eq('userid', user.id)
                    let formattedData = data
                    formattedData.sort((a,b) => {return a.id-b.id})
                    addList(formattedData)
                }
                conectionMade(0)
                setClick(true)
                setChange(false)
            })
    }

    function addAnotation(){
        setChange(true)
        let newList = {
            title: '',
            content: [{text: '1. ', id: 0, complete:false}],
            id: Math.floor(Math.random()*9999999999),
            isNew: true,
            favorite:false
        }
        addList([...allLists, newList])
        conectionMade(1)
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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