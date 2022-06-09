import React, { useState } from "react"
import ListAnotation from "./smallercomponents/ListAnotation"

function Lists({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLists,addList] = useState([])
    const[latestId, addId] = useState(0)

    function finishAnotation(listsize){
        let newLists = [...allLists]
        let contentArray = []
        for(let i=0; i<listsize; i++){
            contentArray.push({
                text: `${i+1}. `,
                id: i,
            })
        }
        newLists.push({
            title: '',
            content: [...contentArray],
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

    function onDelete(listId){
        let newLists = allLists.filter(lists => lists.id!==listId)
        onNoteRemoved()
        addList(newLists)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={() => finishAnotation(1)}>+</button>
            {allLists.map(list =>
                <ListAnotation list={list} onDelete={onDelete} onEdit={onEdit}
                key={list.id} title={list.title} content={list.content}/>
            )}
        </div>
    )
}

export default Lists;