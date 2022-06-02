import React, { useState } from "react"
import NecessaryData from "./smallercomponents/NecessaryData";
import Anotation from "./smallercomponents/Anotation"

function Lists({visualnote, onNoteAdded, onNoteRemoved}) {
    const[allLists,addList] = useState([])
    const[needData,requestD] = useState(false)
    const[latestId, addId] = useState(0)

    function finishAnotation(listsize){
        requestD(false)
        let newLists = [...allLists]
        newLists.push({
            size: listsize,
            title: '',
            content: '',
            id: latestId
        })
        addId(latestId+1)
        addList(newLists)
        onNoteAdded()
    }

    return (
        <div className={visualnote+' displayanotations'}>
            <button className='addanotation' onClick={() => requestD(true)}>+</button>
            {allLists.map(list => 
                <Anotation key={list.id} title={list.title} content={list.content} size={list.size}></Anotation>
            )}
            <NecessaryData size='list' requestD={requestD} onFinish={finishAnotation} visualclass={needData?'':'displaynone'}/>
        </div>
    )
}

export default Lists;