import React, { useState, useEffect } from "react"
import { supabase } from "./SupaBaseClient"
import ListAnotation from "./smallercomponents/ListAnotation"

function Lists({visualnote, onNoteAdded, onNoteRemoved}) {
    const [animation, startAnimation] = useState(false)
    const[allLists,addList] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)
    
    useEffect(() => {
        syncLists()
    }, [])

    async function syncLists(){
        conectionMade(2)
        let oldLists = []
        let newLists = []
        allLists.forEach(list => {
            if(list.isNew){
                newLists.push({
                    title: list.title,
                    content: list.content
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
                const { data, count } = await supabase
                    .from('listas')
                    .select('*', { count: 'exact' })
                onNoteAdded('listas', count, true)
                addList(data)
            })
            .then( () => {
                conectionMade(0)
                console.log('eba')
            })
    }

    function finishAnotation(){
        let newList = {
            title: '',
            content: [{text: '1. ', id: 0, complete:false}],
            id: Math.floor(Math.random()*9999999999),
            isNew: true
        }
        addList([...allLists, newList])
        onNoteAdded('listas', 1)
        conectionMade(1)
    }

    function onEdit(title,content,list){
        const index = allLists.indexOf(list)
        let newLists = [...allLists]
        newLists[index].content = content
        newLists[index].title = title
        addList(newLists)
        conectionMade(1)
    }

    function favorite(list, status){
        let newLists = allLists.filter(lists => lists.id!==list.id)
        if(status){newLists.unshift(list)}
        else{newLists.push(list)}
        addList(newLists)
    }

    async function onDelete(listId){
        let lastconection = sucessAnimation
        conectionMade(2)
        let newLists = allLists.filter(lists => lists.id!==listId)
        const eba = await supabase
            .from('listas')
            .delete()
            .match({ id: listId })
            .then( () => {
                conectionMade(lastconection)
            })
        onNoteRemoved()
        addList(newLists)
    }

    function pulseAnimation() {
        startAnimation(true)
        syncLists()
    }

    return (
        <div className={visualnote}>
            <div className='flex'>
                <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                    <button className='savebutton' onClick={pulseAnimation}>Salvar Listas</button>
                </div>
                <div>
                    <div className={sucessAnimation==0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={sucessAnimation==1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={sucessAnimation==2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizando...
                    </div>
                </div>
            </div>
            <div className='displayanotations'>
                <button className='addanotation' onClick={() => finishAnotation(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="addsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allLists.map(list =>
                    <ListAnotation favorite={favorite} list={list} onDelete={onDelete} onEdit={onEdit}
                    key={list.id} title={list.title} content={list.content}/>
                )}
            </div>
        </div>
    )
}

export default Lists;