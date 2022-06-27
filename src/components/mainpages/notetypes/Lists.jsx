import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import ListAnotation from "./smallercomponents/ListAnotation"

function Lists({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLists,addList] = useState([])
    const[latestId, addId] = useState(1)
    
    useEffect(() => {
        fetchLists()
    }, [])

    async function fetchLists(){
        
    }

    function finishAnotation(listsize){
        let newLists = [...allLists]
        newLists.push({
            title: '',
            content: [{text: '1. ', id: 0, complete:false}],
            id: latestId,
        })
        addId(latestId+1)
        addList(newLists)
        onNoteAdded()
    }

    function onEdit(title,content,list){
        const index = allLists.indexOf(list)
        let newLists = [...allLists]
        newLists[index].content = content
        newLists[index].title = title
        addList(newLists)
    }

    function favorite(list, status){
        let newLists = allLists.filter(lists => lists.id!==list.id)
        if(status){newLists.unshift(list)}
        else{newLists.push(list)}
        addList(newLists)
    }

    function onDelete(listId){
        let newLists = allLists.filter(lists => lists.id!==listId)
        onNoteRemoved()
        addList(newLists)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={() => finishAnotation(1)}>+</button>
            {allLists.map(list =>
                <ListAnotation favorite={favorite} list={list} onDelete={onDelete} onEdit={onEdit}
                key={list.id} title={list.title} content={list.content}/>
            )}
        </div>
    )
}

export default Lists;