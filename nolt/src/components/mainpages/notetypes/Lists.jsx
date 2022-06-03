import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import ListAnotation from "./smallercomponents/ListAnotation"

function Lists({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLists,addList] = useState([])
    const[needData,requestD] = useState(false)
    const[latestId, addId] = useState(0)

    function finishAnotation(listsize){
        requestD(false)
        let newLists = [...allLists]
        let contentArray
        for(i=0; i<listsize; i++){
            contentArray.push('')
        }
        newLists.push({
            title: '',
            content: contentArray,
            id: latestId
        })
        addId(latestId+1)
        addList(newLists)
        onNoteAdded()
    }

    function onEdit(title,content,list){
        let newLists = [...allLists]
        const index = newLists.indexOf(list)
        newLists[index].content = content
        newLists[index].title = title
        addList(newLists)
    }

    function onDelete(listId){
        let newNotes = allLists.filter(lists => lists.id!==listId)
        onNoteRemoved()
        addNote(newNotes)
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={() => requestD(true)}>+</button>
            {allLists.map(list => 
                <ListAnotation note={list} onDelete={onDelete} onEdit={onEdit} key={list.id} title={list.title} content={list.content}/>
            )}
            <NecessaryData size='list' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
        </div>
    )
}

export default Lists;