import React, { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient"
import ListAnotation from "../components/ListAnotation"
import SecondTitle from "../components/SecondTitle"
import useInterval from "../components/UseInterval"
import InfoBox from "../components/InfoBox"
import AddButton from "../components/AddButton"
import EmptyAnotations from "../components/EmptyAnotations"

function Lists({user, propLists, addList, propGroups}) {
    const [successAnimation, conectionMade] = useState(0)
    const [changed, setChange] = useState(false)
    const allLists = propLists?propLists:[]
    const allGroups = propGroups

    useInterval(() => {syncLists(allLists, true)},2000)

    async function syncLists(lists, auto){
        if(!user||!changed&&auto){return}
        setChange(false)
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

    function onSmall(list){
        setChange(true)
        let newLists = [...allLists]
        const index = newLists.indexOf(list)
        newLists[index].small = !newLists[index].small
        addList(newLists)
        conectionMade(1)
    }

    function onFilter(list){
        setChange(true)
        let newLists = [...allLists]
        const index = newLists.indexOf(list)
        newLists[index].filtered = !newLists[index].filtered
        addList(newLists)
        conectionMade(1)
    }

    async function onDelete(listId){
        conectionMade(2)
        let newGroups = [...allGroups]
        let groupChanges = false
        newGroups.forEach(group => {
            const indexFound = group['lists'].indexOf(listId)
            if(indexFound!==-1){
                groupChanges = true
                group['lists'].splice(indexFound, 1)
            }
        })
        if(groupChanges){
            const eba = await supabase
                .from('grupos')
                .upsert(newGroups)
        }
        let newLists = allLists.filter(lists => lists.id!==listId)
        const eba = await supabase
            .from('listas')
            .delete()
            .match({ id: listId })
            .then( () => {
                conectionMade(0)
            })
        addList(newLists)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Anotações' extra='/Listas'/>
            <InfoBox successAnimation={successAnimation}/>
            </div>
            <AddButton addAnotation={addAnotation}/>
            {allLists.length?
            <div className='displayanotations'> 
                {allLists.map(list =>
                    <ListAnotation onFavorite={onFavorite} favorite={list.favorite} list={list} onDelete={onDelete} onEdit={onEdit}
                    filtered={list.filtered} onFilter={onFilter} onSmall={onSmall} small={list.small} key={list.id} title={list.title} content={list.content}/>
                )}
            </div>:
            <EmptyAnotations type='lista'/>
            }
        </div>
    )
}

export default Lists;