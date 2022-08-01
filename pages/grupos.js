import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"
import SecondTitle from "../components/SecondTitle";
import InfoBox from "../components/InfoBox";
import Group from '../components/Group'

function Groups({user}) {
    const [animation, startAnimation] = useState(false)
    const [allGroups, setGroups] = useState([])
    const [sucessAnimation, conectionMade] = useState(0)
    const [clickable, setClick] = useState(true)
    const [changed, setChange] = useState(true)
    const [allNotes, addNote] = useState([])
    const [allLists, addList] = useState([])
    const [allLinks, addLink] = useState([])

    useEffect(()=> {
        syncAnotations()
    }, [user])

    async function syncNotetype(notetype){
        const { data } = await supabase
            .from(notetype)
            .select('*')
            .eq('userid', user.id)
        return(data)
    }

    async function syncAnotations(){
        if(!user){return}
        addNote(await syncNotetype('notas'))
        addList(await syncNotetype('listas'))
        addLink(await syncNotetype('links'))
    }

    function addGroup(){
        setChange(true)
        let newGroup = { title: '', notes:[106,107], lists:[19], links:[10], id: Math.floor(Math.random() * 9999999999), isNew:true, favorite:false}
        setGroups([...allGroups, newGroup])
        conectionMade(1)
        console.log(allGroups)
    }

    function onEdit(group, title, notes, lists, links){
        setChange(true)
        let newGroups = [...allGroups]
        const index = newGroups.indexOf(group)
        newGroups[index].title = title
        newGroups[index].notes = notes
        newGroups[index].lists = lists
        newGroups[index].links = links
        setGroups(newGroups)
        conectionMade(1)
    }

    function onFavorite(group){
        setChange(true)
        let newGroups = [...allGroups]
        const index = newGroups.indexOf(group)
        newGroups[index].favorite = !newGroups[index].favorite
        setGroups(newGroups)
        conectionMade(1)
    }

    function onDelete(groupid){
        let newGroups = [...allGroups]
        newGroups = newGroups.filter(group => group.id!==groupid)
        setGroups(newGroups)
    }

    async function syncGroups(groups, click, auto){
        console.log(allNotes)
    }

    function pulseAnimation() {
        startAnimation(true)
        syncGroups(allGroups, true)
    }

    return (
        <div>
            <div className="infoflex">
            <SecondTitle titlecontent='Grupos'/>
            <InfoBox/>
            </div>
            <div className='flex'>
                <div className={animation ? 'panimation wrapdiv' : 'wrapdiv'} onAnimationEnd={() => startAnimation(false)}>
                    <button className='savebutton' onClick={pulseAnimation}>Salvar Grupos</button>
                </div>
                <div>
                    <div className={sucessAnimation===0?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#2e856e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Os dados estão sincronizados.
                    </div>
                    <div className={sucessAnimation===1?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg' fill="none" viewBox="0 0 24 24" stroke="#e61e1e" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Os dados não estão sincronizados.
                    </div>
                    <div className={sucessAnimation===2?'status':'displaynone'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='conectionsvg rotating' fill="none" viewBox="0 0 24 24" stroke="var(--color1)" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizando...
                    </div>
                </div>
            </div>
            <div className="displaygroups">
                <button className="addgroup" onClick={addGroup}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="navbarsvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {allGroups.map(group => 
                    <Group allNotes={allNotes} allLists={allLists} allLinks={allLinks} 
                    notes={allNotes.filter(note => group['notes'].indexOf(note.id)!==-1)} 
                    lists={allLists.filter(list => group['lists'].indexOf(list.id)!==-1)}
                    links={allLinks.filter(link => group['links'].indexOf(link.id)!==-1)}
                    favorite={group.favorite} title={group.title} key={group.id} group={group} 
                    onDelete={() => onDelete(group.id)} onFavorite={() => onFavorite(group)} onEdit={onEdit}/>
                )}
            </div>
        </div>
    )
}

export default Groups;